// services/api/authApi.js
import api from '../interceptor/axiosInterceptor';

export const loginApi = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.error || 'Login failed');
    }
};
