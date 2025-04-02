// tests/services/paymentApi.test.js
import Constants from 'expo-constants';
import { getPaymentSheetParams } from '../../services/api/paymentApi';

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            payment_endpoint: 'https://mock.endpoint/payment',
        },
    },
}));

describe('getPaymentSheetParams', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return JSON data on a successful fetch', async () => {
        const mockResponseData = {
            paymentIntent: 'pi_mock',
            ephemeralKey: 'ek_mock',
            customer: 'cus_mock',
        };
        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponseData),
        });

        const result = await getPaymentSheetParams('test@example.com', 'price_mock_123', 1);
        expect(global.fetch).toHaveBeenCalledWith('https://mock.endpoint/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test@example.com',
                priceId: 'price_mock_123',
                quantity: 1,
            }),
        });
        expect(result).toEqual(mockResponseData);
    });

    it('should throw an error when the response is not ok and an error message is provided', async () => {
        const errorMessage = 'Invalid request';
        global.fetch.mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ error: errorMessage }),
        });

        await expect(
            getPaymentSheetParams('test@example.com', 'price_mock_123', 1)
        ).rejects.toThrow(errorMessage);
    });

    it('should throw a default error when the response error message is not provided', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({}),
        });

        await expect(
            getPaymentSheetParams('test@example.com', 'price_mock_123', 1)
        ).rejects.toThrow('Something went wrong');
    });

    it('should throw an error if the payment endpoint is not defined', async () => {
        // Temporarily override the Constants to simulate a missing payment_endpoint
        const originalConfig = Constants.expoConfig;
        Constants.expoConfig = { extra: {} };

        await expect(
            getPaymentSheetParams('test@example.com', 'price_mock_123', 1)
        ).rejects.toThrow('Payment endpoint is not defined');

        // Restore the original configuration
        Constants.expoConfig = originalConfig;
    });
});
