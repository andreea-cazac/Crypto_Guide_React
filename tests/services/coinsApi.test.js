import { getAllCoins } from '../../services/api/coinsApi';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    get: jest.fn(),
}));

describe('coinsApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCoins', () => {
        it('returns data on success', async () => {
            const mockData = [{ symbol: 'BTC' }];
            api.get.mockResolvedValueOnce({ data: mockData });

            const result = await getAllCoins();

            expect(api.get).toHaveBeenCalledWith('/coins');
            expect(result).toEqual(mockData);
        });

        it('throws error with custom message if API fails with response', async () => {
            api.get.mockRejectedValueOnce({
                response: { data: { message: 'API failed' } },
            });

            await expect(getAllCoins()).rejects.toThrow('API failed');
        });

        it('throws generic error if response is missing', async () => {
            api.get.mockRejectedValueOnce({});

            await expect(getAllCoins()).rejects.toThrow('Failed to load coins');
        });
    });
});
