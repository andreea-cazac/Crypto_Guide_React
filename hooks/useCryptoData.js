import { useEffect, useState } from 'react';
import { getAllCoins, getLocalCoins } from '../services/api/coinsApi';
import { useApiConfig } from './useApiConfig';

export const useCryptoData = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const { config, loading: configLoading } = useApiConfig();

    useEffect(() => {
        if (configLoading) return;
        const fetchCoins = async () => {
            try {
                const data =
                    config.coins === 'external' ? await getAllCoins() : await getLocalCoins();
                setCoins(data);
                setLastUpdated(new Date());
            } catch (error) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message:
                        'We couldn’t load the crypto prices. Please check your connection or try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, [config, configLoading]);

    return { coins, loading, errorMessage, lastUpdated };
};
