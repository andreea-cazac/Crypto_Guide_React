import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi } from '../services/api/authApi';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        setInvalidCredentials(false);

        try {
            const data = await loginApi(email, password);
            await AsyncStorage.setItem('jwtToken', data.token);
            await AsyncStorage.setItem('activeSubscription', data.activeSubscription.toString());
            return data;
        } catch (err) {
            const message = err.message;
            setError(message);

            if (message.toLowerCase().includes('invalid credentials')) {
                setInvalidCredentials(true);
            }

            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetInvalid = () => setInvalidCredentials(false);

    return { login, loading, error, invalidCredentials, resetInvalid };
};
