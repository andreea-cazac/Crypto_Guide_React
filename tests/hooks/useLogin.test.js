// tests/hooks/useLogin.test.js
import {renderHook, act} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../hooks/useLogin';
import { loginApi } from '../../services/api/authApi';

// Mock the loginApi so we can simulate API responses
jest.mock('../../services/api/authApi', () => ({
    loginApi: jest.fn(),
}));

// Mock AsyncStorage setItem
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));

describe('useLogin Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully login and store token', async () => {
        const fakeResponse = { token: 'fake-jwt-token', activeSubscription: false };
        loginApi.mockResolvedValueOnce(fakeResponse);

        const { result } = renderHook(() => useLogin());

        // Call the login function from the hook
        await act(async () => {
            const data = await result.current.login('test@example.com', 'password123');
            expect(data).toEqual(fakeResponse);
        });

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('jwtToken', fakeResponse.token);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('activeSubscription', fakeResponse.activeSubscription.toString());
        expect(result.current.error).toBe(null);
    });

    it('should set error and invalidCredentials on login failure', async () => {
        const errorMessage = 'Invalid credentials';
        loginApi.mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await expect(result.current.login('test@example.com', 'wrongpassword')).rejects.toThrow(errorMessage);
        });

        expect(result.current.error).toEqual(errorMessage);
        expect(result.current.invalidCredentials).toBe(true);
    });
});
