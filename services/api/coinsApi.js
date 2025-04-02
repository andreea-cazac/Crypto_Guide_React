import api from '../interceptor/axiosInterceptor';

export const getAllCoins = async () => {
    try {
        const response = await api.get('/coins');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to load coins');
    }
};

export const getLocalCoins = async () => {
    try {
        const response = await api.get('/coins/local');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to load local coins');
    }
};
