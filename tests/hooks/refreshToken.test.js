import AsyncStorage from '@react-native-async-storage/async-storage';
import * as JwtDecodeModule from 'jwt-decode';
import { refreshToken } from '../../hooks/refreshToken';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    get: jest.fn(),
}));

describe('refreshToken', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if no token is stored', async () => {
        console.error = jest.fn();
        AsyncStorage.getItem.mockResolvedValue(null);

        await expect(refreshToken()).rejects.toThrow('No token available');
    });

    it('should refresh token and return decoded token on success', async () => {
        const oldToken = 'old.token.value';
        const newToken = 'new.token.value';
        const decodedToken = { sub: 'test@example.com', role: ['user'] };

        AsyncStorage.getItem.mockResolvedValue(oldToken);

        api.get.mockResolvedValue({
            data: { token: newToken },
        });

        jest.spyOn(JwtDecodeModule, 'jwtDecode').mockReturnValue(decodedToken);

        const result = await refreshToken();

        expect(api.get).toHaveBeenCalledWith('/auth/refresh-token', {
            headers: {
                Authorization: `Bearer ${oldToken}`,
            },
        });

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('jwtToken', newToken);
        expect(JwtDecodeModule.jwtDecode).toHaveBeenCalledWith(newToken);
        expect(result).toEqual(decodedToken);
    });

    it('should handle and log errors if token refresh fails', async () => {
        const token = 'existing.token';
        const error = new Error('Request failed');

        AsyncStorage.getItem.mockResolvedValue(token);
        api.get.mockRejectedValue(error);

        console.error = jest.fn();

        await expect(refreshToken()).rejects.toThrow('Request failed');
        expect(console.error).toHaveBeenCalledWith('Failed to refresh token', error);
    });
});