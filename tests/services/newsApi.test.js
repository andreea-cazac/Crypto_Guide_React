import { getLatestNews } from '../../services/api/newsApi';
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
});
