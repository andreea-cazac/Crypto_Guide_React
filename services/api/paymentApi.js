// services/api/paymentApi.js
import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.api_base_url;
const PAYMENT_ENDPOINT = Constants.expoConfig?.extra?.payment_endpoint;
// Log the endpoints when this module loads.
console.log("API_BASE_URL from env:", API_BASE_URL);
console.log("PAYMENT_ENDPOINT from env:", PAYMENT_ENDPOINT);

export const createSubscription = async (subscriptionPayload) => {
    try {
        const response = await axios.post(PAYMENT_ENDPOINT, subscriptionPayload);
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};
