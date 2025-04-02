import { updatePasswordApi } from '../../services/api/accountApi';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    put: jest.fn(),
}));

describe('updatePasswordApi', () => {
    const mockEmail = 'test@example.com';
    const currentPassword = 'oldPass123';
    const newPassword = 'newPass456';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns response data on success', async () => {
        const mockData = { success: true };
        api.put.mockResolvedValueOnce({ data: mockData });

        const result = await updatePasswordApi(mockEmail, currentPassword, newPassword);

        expect(api.put).toHaveBeenCalledWith('/auth/updatePassword', {
            email: mockEmail,
            currentPassword,
            newPassword,
        });

        expect(result).toEqual(mockData);
    });

    it('throws custom error message when response has an error', async () => {
        api.put.mockRejectedValueOnce({
            response: { data: { error: 'Invalid password' } },
        });

        await expect(
            updatePasswordApi(mockEmail, currentPassword, newPassword)
        ).rejects.toThrow('Invalid password');
    });

    it('throws default error message when no response data is present', async () => {
        api.put.mockRejectedValueOnce({});

        await expect(
            updatePasswordApi(mockEmail, currentPassword, newPassword)
        ).rejects.toThrow('Failed to update password');
    });
});
