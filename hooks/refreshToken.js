import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import api from '../services/interceptor/axiosInterceptor';

export const refreshToken = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No token available');
        }

        const response = await api.get('/auth/refresh-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const newToken = response.data.token;
        await AsyncStorage.setItem('jwtToken', newToken);

        const decoded = jwtDecode(newToken);
        return decoded;
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
    }
};
