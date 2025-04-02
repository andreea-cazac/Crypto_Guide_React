import { Alert } from 'react-native';
import {renderHook, act} from '@testing-library/react-native';
import { useAccountActions } from '../../hooks/useAccountActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePasswordApi } from '../../services/api/accountApi';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    clear: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

jest.mock('../../services/api/accountApi', () => ({
    updatePasswordApi: jest.fn(),
}));

describe('useAccountActions', () => {
    const mockReplace = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue({ replace: mockReplace });
    });

    describe('updatePassword', () => {
        it('shows validation alert when inputs are empty', () => {
            const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
            const { result } = renderHook(() => useAccountActions());

            act(() => {
                result.current.updatePassword('', '', jest.fn());
            });

            expect(alertSpy).toHaveBeenCalledWith(
                'Validation Error',
                'Please fill in both current and new password fields.'
            );
        });

        it('shows success alert and calls updatePasswordApi on confirmation', async () => {
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderHook(() => useAccountActions());

            await act(async () => {
                result.current.updatePassword('oldpass', 'newpass', jest.fn());
            });

            // Manually trigger the "Yes" button
            const alertCall = alertSpy.mock.calls[0];
            const confirmButton = alertCall[2].find(btn => btn.text === 'Yes');

            AsyncStorage.getItem.mockResolvedValue('mock.jwt.token');
            jwtDecode.mockReturnValue({ sub: 'test@example.com' });
            updatePasswordApi.mockResolvedValue();

            const onSuccess = jest.fn();
            await act(async () => {
                await confirmButton.onPress();
            });

            expect(updatePasswordApi).toHaveBeenCalledWith('test@example.com', 'oldpass', 'newpass');
            expect(Alert.alert).toHaveBeenCalledWith('Success', 'Password updated successfully!');
        });

        it('shows error alert when update fails', async () => {
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderHook(() => useAccountActions());

            await act(async () => {
                result.current.updatePassword('oldpass', 'newpass');
            });

            const confirmButton = alertSpy.mock.calls[0][2].find(btn => btn.text === 'Yes');

            AsyncStorage.getItem.mockResolvedValue('mock.jwt.token');
            jwtDecode.mockReturnValue({ sub: 'test@example.com' });
            updatePasswordApi.mockRejectedValue(new Error('Update failed'));

            await act(async () => {
                await confirmButton.onPress();
            });

            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Update failed');
        });

        it('shows error if token is missing', async () => {
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderHook(() => useAccountActions());

            await act(async () => {
                result.current.updatePassword('oldpass', 'newpass');
            });

            const confirmButton = alertSpy.mock.calls[0][2].find(btn => btn.text === 'Yes');
            AsyncStorage.getItem.mockResolvedValue(null);

            await act(async () => {
                await confirmButton.onPress();
            });

            expect(Alert.alert).toHaveBeenCalledWith('Error', 'User not logged in');
        });
    });

    describe('logout', () => {
        it('clears AsyncStorage and navigates to login', async () => {
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderHook(() => useAccountActions());

            await act(async () => {
                result.current.logout();
            });

            const confirmButton = alertSpy.mock.calls[0][2].find(btn => btn.text === 'Yes');

            await act(async () => {
                await confirmButton.onPress();
            });

            expect(AsyncStorage.clear).toHaveBeenCalled();
            expect(mockReplace).toHaveBeenCalledWith('/login');
        });
    });
});
