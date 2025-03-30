// 📁 services/api/categoryApi.js
import api from '../interceptor/axiosInterceptor';

export const getAllCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to load categories');
    }
};
