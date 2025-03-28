import api from '../interceptor/axiosInterceptor';

export const getAllGlossaryTerms = async () => {
    try {
        const response = await api.get('/terms');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to load glossary terms');
    }
};