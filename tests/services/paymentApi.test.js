import { getPaymentSheetParams } from '../../services/api/paymentApi';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    post: jest.fn(),
}));

describe('getPaymentSheetParams', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns data when api.post is successful', async () => {
        const mockResponseData = {
            paymentIntent: 'pi_mock',
            ephemeralKey: 'ek_mock',
            customer: 'cus_mock',
        };

        api.post.mockResolvedValueOnce({ data: mockResponseData });

        const result = await getPaymentSheetParams('test@example.com', 'price_mock_123', 1);

        expect(api.post).toHaveBeenCalledWith('/stripe/payment-sheet', {
            email: 'test@example.com',
            priceId: 'price_mock_123',
            quantity: 1,
        });

        expect(result).toEqual(mockResponseData);
    });

    it('throws error with message from response', async () => {
        api.post.mockRejectedValueOnce({
            response: {
                data: {
                    error: 'Invalid request',
                },
            },
        });

        await expect(
            getPaymentSheetParams('test@example.com', 'price_mock_123', 1)
        ).rejects.toThrow('Invalid request');
    });

    it('throws default error if no error message from server', async () => {
        api.post.mockRejectedValueOnce({});

        await expect(
            getPaymentSheetParams('test@example.com', 'price_mock_123', 1)
        ).rejects.toThrow('Something went wrong');
    });
});