// tests/services/authApi.test.js
import { loginApi } from '../../services/api/authApi';
import api from '../../services/interceptor/axiosInterceptor';

// Mock the axios interceptor
jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    post: jest.fn(),
}));

describe('loginApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return data when login is successful', async () => {
        const fakeResponse = { data: { token: 'fake-jwt-token', activeSubscription: false } };
        api.post.mockResolvedValueOnce(fakeResponse);

        const result = await loginApi('test@example.com', 'password123');
        expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'password123' });
        expect(result).toEqual(fakeResponse.data);
    });

    it('should throw error when login fails with an error message', async () => {
        const errorResponse = { response: { data: { error: 'Invalid credentials' } } };
        api.post.mockRejectedValueOnce(errorResponse);

        await expect(loginApi('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should throw default error when error response has no error message', async () => {
        const errorResponse = { response: {} };
        api.post.mockRejectedValueOnce(errorResponse);

        await expect(loginApi('test@example.com', 'wrongpassword')).rejects.toThrow('Login failed');
    });
});
