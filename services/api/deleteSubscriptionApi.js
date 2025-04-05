import api from '../interceptor/axiosInterceptor';

export const deleteSubscriptionApi = async (email) => {
    try {
        const response = await api.delete(`/stripe/subscription?email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.error || 'Failed to cancel subscription');
    }
};