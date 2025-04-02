import { getLatestNews, getLocalNews } from '../../services/api/newsApi';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    get: jest.fn(),
}));

describe('newsApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getLatestNews', () => {
        it('returns news data on success', async () => {
            const mockData = [{ title: 'Bitcoin up 10%' }];
            api.get.mockResolvedValueOnce({ data: mockData });

            const result = await getLatestNews();

            expect(api.get).toHaveBeenCalledWith('/news');
            expect(result).toEqual(mockData);
        });

        it('throws error with server message', async () => {
            api.get.mockRejectedValueOnce({
                response: { data: { message: 'News API error' } },
            });

            await expect(getLatestNews()).rejects.toThrow('News API error');
        });

        it('throws generic error if no server response', async () => {
            api.get.mockRejectedValueOnce({});

            await expect(getLatestNews()).rejects.toThrow('Failed to load news');
        });
    });

    describe('getLocalNews', () => {
        it('returns local news data on success', async () => {
            const mockData = [{ title: 'Local update' }];
            api.get.mockResolvedValueOnce({ data: mockData });

            const result = await getLocalNews();

            expect(api.get).toHaveBeenCalledWith('/news/local');
            expect(result).toEqual(mockData);
        });

        it('throws error with server message', async () => {
            api.get.mockRejectedValueOnce({
                response: { data: { message: 'Local news error' } },
            });

            await expect(getLocalNews()).rejects.toThrow('Local news error');
        });

        it('throws generic error if no server response', async () => {
            api.get.mockRejectedValueOnce({});

            await expect(getLocalNews()).rejects.toThrow('Failed to load local news');
        });
    });
});
