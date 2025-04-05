// services/api/paymentApi.js
import api from '../interceptor/axiosInterceptor';

export const getPaymentSheetParams = async (email, priceId, quantity) => {
    try {
        const response = await api.post('/stripe/payment-sheet', {
            email,
            priceId,
            quantity,
        });

        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.error || 'Something went wrong');
    }
};