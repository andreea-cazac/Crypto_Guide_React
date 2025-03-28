import { getAllGlossaryTerms } from '../../../services/api/glossaryApi';
import api from '../../../services/interceptor/axiosInterceptor';

jest.mock('../../../services/interceptor/axiosInterceptor');

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