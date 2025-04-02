import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAccountScreen } from '../../hooks/useAccountScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';
import { useAccountActions } from '../../hooks/useAccountActions';
import { useApiConfig } from '../../hooks/useApiConfig';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

jest.mock('../../hooks/useAccountActions', () => ({
    useAccountActions: jest.fn(),
}));

jest.mock('../../hooks/useApiConfig', () => ({
    useApiConfig: jest.fn(),
}));

describe('useAccountScreen', () => {
    const mockPush = jest.fn();
    const mockUpdatePassword = jest.fn();
    const mockLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue({ push: mockPush });
        useAccountActions.mockReturnValue({
            updatePassword: mockUpdatePassword,
            logout: mockLogout,
        });
        useApiConfig.mockReturnValue({ config: {} });
    });

    it('should detect admin role from token', async () => {
        AsyncStorage.getItem.mockResolvedValue('mock.jwt.token');
        jwtDecode.mockReturnValue({
            role: [{ authority: 'ROLE_admin' }],
        });

        const { result } = renderHook(() => useAccountScreen());

        await waitFor(() => {
            expect(result.current.isAdmin).toBe(true);
        });
    });


    it('should not crash if token is missing or decoding fails', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        jwtDecode.mockImplementation(() => {
            throw new Error('Failed to decode');
        });

        renderHook(() => useAccountScreen());

        await waitFor(() => {
            // since token is null, decode shouldn't be called
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });



    it('should handle show and cancel password update form', () => {
        const { result } = renderHook(() => useAccountScreen());

        act(() => result.current.handleShowUpdateForm());
        expect(result.current.showUpdateForm).toBe(true);

        act(() => {
            result.current.setCurrentPassword('abc');
            result.current.setNewPassword('123');
            result.current.handleCancelUpdate();
        });

        expect(result.current.showUpdateForm).toBe(false);
        expect(result.current.currentPassword).toBe('');
        expect(result.current.newPassword).toBe('');
    });

    it('should call updatePassword with correct args', () => {
        const { result } = renderHook(() => useAccountScreen());

        act(() => {
            result.current.setCurrentPassword('old');
            result.current.setNewPassword('new');
        });

        act(() => {
            result.current.handleConfirmUpdate();
        });

        expect(mockUpdatePassword).toHaveBeenCalledWith('old', 'new', expect.any(Function));
    });

    it('should navigate to /payment on subscribe', () => {
        const { result } = renderHook(() => useAccountScreen());
        act(() => result.current.handleSubscribe());
        expect(mockPush).toHaveBeenCalledWith('/payment');
    });

    it('should navigate to /main on user role test', () => {
        const { result } = renderHook(() => useAccountScreen());
        act(() => result.current.handleUserRoleTest());
        expect(mockPush).toHaveBeenCalledWith('/main');
    });

    it('should navigate to /dashboard on dashboard handler', () => {
        const { result } = renderHook(() => useAccountScreen());
        act(() => result.current.handleDashboard());
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });

    it('should call logout', () => {
        const { result } = renderHook(() => useAccountScreen());
        act(() => result.current.logout());
        expect(mockLogout).toHaveBeenCalled();
    });
});
