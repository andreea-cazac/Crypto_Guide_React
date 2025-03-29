import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useCryptoData } from '../../hooks/useCryptoData';
import { useNewsData } from '../../hooks/useNewsData';
import { useSortedNews } from '../../hooks/useSortedNews';

jest.mock('../../services/api/coinsApi', () => ({
    getAllCoins: jest.fn(),
}));

jest.mock('../../services/api/newsApi', () => ({
    getLatestNews: jest.fn(),
}));

import { getAllCoins } from '../../services/api/coinsApi';
import { getLatestNews } from '../../services/api/newsApi';

describe('useCryptoData', () => {
    it('fetches and sets coins data successfully', async () => {
        const mockData = [{ symbol: 'BTC', price: 123 }];
        getAllCoins.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useCryptoData());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.coins).toEqual(mockData);
        expect(result.current.loading).toBe(false);
        expect(result.current.errorMessage).toBe(null);
        expect(result.current.lastUpdated).toBeInstanceOf(Date);
    });

    it('handles fetch error', async () => {
        getAllCoins.mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => useCryptoData());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.errorMessage).toBeTruthy();
        expect(result.current.coins).toEqual([]);
        expect(result.current.loading).toBe(false);
    });
});

describe('useNewsData', () => {
    it('fetches and sets news data successfully', async () => {
        const mockNews = [{ id: 1, title: 'News!', body: 'abc', published_on: 123 }];
        getLatestNews.mockResolvedValueOnce(mockNews);

        const { result } = renderHook(() => useNewsData());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.news).toEqual(mockNews);
        expect(result.current.loading).toBe(false);
        expect(result.current.errorMessage).toBe(null);
    });

    it('handles news fetch error', async () => {
        getLatestNews.mockRejectedValueOnce(new Error('News fetch failed'));

        const { result } = renderHook(() => useNewsData());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.news).toEqual([]);
        expect(result.current.errorMessage).toBeTruthy();
        expect(result.current.loading).toBe(false);
    });
});

describe('useSortedNews', () => {
    const sampleNews = [
        { id: 1, body: 'Short body', published_on: 1 },
        { id: 2, body: 'Longer body text here', published_on: 2 },
    ];

    it('sorts by recent by default', () => {
        const { result } = renderHook(() => useSortedNews(sampleNews, 'recent'));
        expect(result.current[0].id).toBe(2);
    });

    it('sorts by shortest', () => {
        const { result } = renderHook(() => useSortedNews(sampleNews, 'shortest'));
        expect(result.current[0].id).toBe(1);
    });

    it('sorts by longest', () => {
        const { result } = renderHook(() => useSortedNews(sampleNews, 'longest'));
        expect(result.current[0].id).toBe(2);
    });

    it('returns empty array if no news', () => {
        const { result } = renderHook(() => useSortedNews([], 'recent'));
        expect(result.current).toEqual([]);
    });
});
