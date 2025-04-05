// useCryptoData.js
import { useEffect, useState } from 'react';
import api from '../services/interceptor/axiosInterceptor';

export const useCryptoData = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setLoading(true);
        setErrorMessage(null);

        (async () => {
            try {
                const response = await api.get('/coins');
                const data = response.data;

                if (!Array.isArray(data) || data.length === 0) {
                    setErrorMessage({
                        title: 'Oops! Something went wrong',
                        message: 'Failed to load crypto prices. Please try again later.',
                        type: 'error',
                    });
                    setCoins([]);
                } else {
                    setCoins(data);
                }
            } catch (_err) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'Failed to load crypto prices. Please try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { coins, loading, errorMessage };
};