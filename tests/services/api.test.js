// tests/services/api.test.js
import api from '../../services/interceptor/axiosInterceptor';
import { getAllCoins } from '../../services/api/coinsApi';
import { getLatestNews } from '../../services/api/newsApi';
import {getAllGlossaryTerms} from "../../services/api/glossaryApi";
import { getAllDexChanges } from '../../services/api/dexApi';

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

describe('getAllGlossaryTerms', () => {
    it('returns glossary data from API', async () => {
        const mockData = [{ id: 1, term: 'Bitcoin', meaning: 'Crypto' }];
        api.get.mockResolvedValue({ data: mockData });

        const result = await getAllGlossaryTerms();
        expect(result).toEqual(mockData);
    });

    it('throws custom error if API fails', async () => {
        api.get.mockRejectedValue({});

        await expect(getAllGlossaryTerms()).rejects.toThrow('Failed to load glossary terms');
    });
});
import { getAllCategories } from '../../services/api/categoryApi';

describe('getAllCategories', () => {
    it('returns categories data on success', async () => {
        const mockData = [{ id: 1, name: 'Exchange', articles: [] }];
        api.get.mockResolvedValueOnce({ data: mockData });

        const result = await getAllCategories();
        expect(result).toEqual(mockData);
        expect(api.get).toHaveBeenCalledWith('/categories');
    });

    it('throws custom error message when API responds with error message', async () => {
        api.get.mockRejectedValueOnce({
            response: { data: { message: 'Server error!' } },
        });

        await expect(getAllCategories()).rejects.toThrow('Server error!');
    });

    it('throws fallback error message when no specific message provided', async () => {
        api.get.mockRejectedValueOnce({});

        await expect(getAllCategories()).rejects.toThrow('Failed to load categories');
    });
});

describe('getAllDexChanges', () => {
    it('returns dex data on success', async () => {
        const mockData = [{ name: 'Uniswap', status: 'active' }];
        api.get.mockResolvedValueOnce({ data: mockData });

        const result = await getAllDexChanges();
        expect(result).toEqual(mockData);
        expect(api.get).toHaveBeenCalledWith('/dexchanges');
    });

    it('throws error on failure', async () => {
        api.get.mockRejectedValueOnce(new Error('Server Error'));
        await expect(getAllDexChanges()).rejects.toThrow('Failed to fetch DEX platforms');
    });
});