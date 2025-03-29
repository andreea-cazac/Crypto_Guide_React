// tests/services/api.test.js
import api from '../../services/interceptor/axiosInterceptor';
import { getAllCoins } from '../../services/api/coinsApi';
import { getLatestNews } from '../../services/api/newsApi';

jest.mock('../../services/interceptor/axiosInterceptor');

describe('getAllCoins', () => {
    it('returns data when successful', async () => {
        const mockData = [{ symbol: 'BTC', price: 1000 }];
        api.get.mockResolvedValueOnce({ data: mockData });

        const result = await getAllCoins();
        expect(result).toEqual(mockData);
        expect(api.get).toHaveBeenCalledWith('/coins');
    });

    it('throws error when failed', async () => {
        api.get.mockRejectedValueOnce({ response: { data: { message: 'Failed!' } } });
        await expect(getAllCoins()).rejects.toThrow('Failed!');
    });
});

describe('getLatestNews', () => {
    it('returns news data when successful', async () => {
        const mockData = [{ title: 'News' }];
        api.get.mockResolvedValueOnce({ data: mockData });

        const result = await getLatestNews();
        expect(result).toEqual(mockData);
        expect(api.get).toHaveBeenCalledWith('/news');
    });

    it('throws fallback message if no message from server', async () => {
        api.get.mockRejectedValueOnce({});
        await expect(getLatestNews()).rejects.toThrow('Failed to load news');
    });
});