import axios from 'axios';
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.api_base_url;

const api = axios.create({
    baseURL: API_BASE_URL, // <-- change to your backend root
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Attach token in future
api.interceptors.request.use(
    (config) => {
        // config.headers.Authorization = `Bearer ${yourToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;