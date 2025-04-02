// services/api/paymentApi.js
import Constants from 'expo-constants';

export const getPaymentSheetParams = async (email, priceId, quantity) => {
    const paymentEndpoint = Constants.expoConfig?.extra?.payment_endpoint;
    if (!paymentEndpoint) {
        throw new Error('Payment endpoint is not defined');
    }

    const response = await fetch(paymentEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            priceId,
            quantity,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    return await response.json();
};
