import {renderHook, waitFor} from '@testing-library/react-native';
import {useCryptoData} from '../../hooks/useCryptoData';
import {useNewsData} from '../../hooks/useNewsData';
import {useSortedNews} from '../../hooks/useSortedNews';
import {useExchangeArticles} from '../../hooks/useExchangeArticles';
import * as categoryApi from '../../services/api/categoryApi';
import {getAllCoins} from '../../services/api/coinsApi';
import {getLatestNews} from '../../services/api/newsApi';
import {useResolvedArticleContent} from '../../hooks/useResolvedArticleContent';
import * as dexApi from '../../services/api/dexApi';
import * as glossaryApi from '../../services/api/glossaryApi';
import {useGlossaryTerms} from '../../hooks/useGlossaryTerms';
import {groupGlossaryTerms} from '../../utils/groupGlossaryTerms';
import api from '../../services/interceptor/axiosInterceptor';

jest.mock('../../services/api/dexApi');
jest.mock('../../services/api/glossaryApi');
jest.mock('../../utils/groupGlossaryTerms');

jest.mock('../../services/api/coinsApi', () => ({
    getAllCoins: jest.fn(),
}));

jest.mock('../../services/api/newsApi', () => ({
    getLatestNews: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() =>
        Promise.resolve(JSON.stringify({ news: 'external', coins: 'external' }))
    ),
    setItem: jest.fn(),
}));

jest.mock('../../services/interceptor/axiosInterceptor', () => ({
    get: jest.fn(),
}));

describe('useCryptoData', () => {
    it('fetches and sets coins data successfully', async () => {
        const mockData = [{ symbol: 'BTC', price: 123 }];
        api.get.mockResolvedValueOnce({ data: mockData });

        const { result } = renderHook(() => useCryptoData());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.coins).toEqual(mockData);
        expect(result.current.loading).toBe(false);
        expect(result.current.errorMessage).toBe(null);
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
        api.get.mockResolvedValueOnce({ data: mockNews });

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

jest.mock('../../services/api/categoryApi');

const mockArticles = [
    { id: 2, title: 'How to Exchange Crypto?', content: '...' },
    { id: 1, title: 'Exchange Platforms', content: '...' },
];

describe('useExchangeArticles', () => {
    it('fetches and sorts articles by ID', async () => {
        categoryApi.getAllCategories.mockResolvedValueOnce([
            { name: 'Exchange', articles: mockArticles },
        ]);

        const { result } = renderHook(() => useExchangeArticles());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.articles[0].id).toBe(1); // Sorted by ID
        expect(result.current.errorMessage).toBe(null);
    });

    it('sets error when category not found', async () => {
        categoryApi.getAllCategories.mockResolvedValueOnce([
            { name: 'Other', articles: [] },
        ]);

        const { result } = renderHook(() => useExchangeArticles());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.errorMessage).toMatchObject({
            title: 'Exchange category not found',
            message: 'Please make sure the Exchange section exists in the backend.',
            type: 'error'
        });
    });
});

describe('useResolvedArticleContent', () => {
    it('returns content if not a DEX article', async () => {
        const { result } = renderHook(() =>
            useResolvedArticleContent('Some Title', 'Static content here')
        );
        expect(result.current.resolvedContent).toBe('Static content here');
        expect(result.current.tableData).toEqual([]);
    });

    it('fetches and formats DEX table data', async () => {
        const mockData = [
            { name: 'Uniswap v3', market_share: 0.1, status: 'active' },
            { name: 'Uniswap v2', market_share: 0.05, status: 'active' },
        ];
        dexApi.getAllDexChanges.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() =>
            useResolvedArticleContent('List of DEX Platforms', '')
        );

        await waitFor(() => {
            expect(result.current.tableData.length).toBeGreaterThan(0);
            expect(result.current.resolvedContent).toBe('');
        });
    });

    it('handles API failure gracefully', async () => {
        dexApi.getAllDexChanges.mockRejectedValueOnce(new Error('Fail'));

        const { result } = renderHook(() =>
            useResolvedArticleContent('List of DEX Platforms', '')
        );

        await waitFor(() =>
            expect(result.current.errorMessage).toMatchObject({
                type: 'error',
                title: 'DEX Platforms Load Error',
                message: 'Unable to load DEX platforms at the moment. Please try again later.'
            })
        );
    });
});


describe('useGlossaryTerms', () => {
    it('returns grouped terms and alphabet when API call succeeds', async () => {
        const mockTerms = [
            { id: 1, term: 'Altcoin', meaning: 'Alternative coin' }
        ];
        const mockGrouped = { A: [mockTerms[0]] };
        const mockAlphabet = ['A'];

        glossaryApi.getAllGlossaryTerms.mockResolvedValueOnce(mockTerms);
        groupGlossaryTerms.mockReturnValueOnce({
            grouped: mockGrouped,
            alphabet: mockAlphabet
        });

        const { result } = renderHook(() => useGlossaryTerms());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.groupedTerms).toEqual(mockGrouped);
        expect(result.current.alphabet).toEqual(mockAlphabet);
        expect(result.current.errorMessage).toBeNull();
    });

    it('sets errorMessage if API call fails', async () => {
        glossaryApi.getAllGlossaryTerms.mockRejectedValueOnce(new Error('API failed'));

        const { result } = renderHook(() => useGlossaryTerms());
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.errorMessage).toMatchObject({
            title: 'Oops! Something went wrong',
            message: expect.any(String),
            type: 'error',
        });
    });
});
