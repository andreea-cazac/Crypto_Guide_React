import api from '../../services/interceptor/axiosInterceptor';
import { deleteSubscriptionApi } from '../../services/api/deleteSubscriptionApi';

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    delete: jest.fn(),
}));

describe('deleteSubscriptionApi', () => {
    const email = 'test@example.com';
    const encodedEmail = encodeURIComponent(email);

    it('should return response.data on successful API call', async () => {
        const mockData = { success: true };
        api.delete.mockResolvedValue({ data: mockData });

        const result = await deleteSubscriptionApi(email);

        expect(api.delete).toHaveBeenCalledWith(`/stripe/subscription?email=${encodedEmail}`);
        expect(result).toEqual(mockData);
    });

    it('should throw an error with the error message from response', async () => {
        const errorMessage = 'Some error occurred';
        const errorObj = {
            response: {
                data: {
                    error: errorMessage,
                },
            },
        };
        api.delete.mockRejectedValue(errorObj);

        await expect(deleteSubscriptionApi(email)).rejects.toThrow(errorMessage);
        expect(api.delete).toHaveBeenCalledWith(`/stripe/subscription?email=${encodedEmail}`);
    });

    it('should throw default error message if error response exists but no error message', async () => {
        const errorObj = {
            response: {
                data: {},
            },
        };
        api.delete.mockRejectedValue(errorObj);

        await expect(deleteSubscriptionApi(email)).rejects.toThrow('Failed to cancel subscription');
        expect(api.delete).toHaveBeenCalledWith(`/stripe/subscription?email=${encodedEmail}`);
    });

    it('should throw default error message if error response is undefined', async () => {
        const errorObj = {}; // No response property
        api.delete.mockRejectedValue(errorObj);

        await expect(deleteSubscriptionApi(email)).rejects.toThrow('Failed to cancel subscription');
        expect(api.delete).toHaveBeenCalledWith(`/stripe/subscription?email=${encodedEmail}`);
    });
});