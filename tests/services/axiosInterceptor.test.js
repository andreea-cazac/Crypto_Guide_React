import api from '../../services/interceptor/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            api_base_url: 'https://mock-api.com',
        },
    },
}));

describe('axiosInterceptor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create axios instance with correct baseURL and headers', () => {
        expect(api.defaults.baseURL).toBe('https://mock-api.com');
        expect(api.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('should attach Authorization header if token is present', async () => {
        AsyncStorage.getItem.mockResolvedValue('test-token');

        const config = { headers: {} };

        const result = await api.interceptors.request.handlers[0].fulfilled(config);

        expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    it('should not attach Authorization header if token is not found', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);

        const config = { headers: {} };

        const result = await api.interceptors.request.handlers[0].fulfilled(config);

        expect(result.headers.Authorization).toBeUndefined();
    });

    it('should reject request interceptor error', async () => {
        const error = new Error('Request failed');
        await expect(
            api.interceptors.request.handlers[0].rejected(error)
        ).rejects.toThrow('Request failed');
    });

    it('should pass through response in interceptor', async () => {
        const mockResponse = { data: 'test' };
        const result = await api.interceptors.response.handlers[0].fulfilled(mockResponse);
        expect(result).toEqual(mockResponse);
    });

    it('should reject response interceptor error', async () => {
        const error = new Error('Response error');
        await expect(
            api.interceptors.response.handlers[0].rejected(error)
        ).rejects.toThrow('Response error');
    });
});