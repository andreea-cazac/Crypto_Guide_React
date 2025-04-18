import api from '../interceptor/axiosInterceptor';

export const getLatestNews = async () => {
    try {
        const response = await api.get('/news');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to load news');
    }
};
