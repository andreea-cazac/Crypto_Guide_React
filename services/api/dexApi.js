import api from '../interceptor/axiosInterceptor';

export const getAllDexChanges = async () => {
    try {
        const response = await api.get('/dexchanges');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch DEX platforms');
    }
};