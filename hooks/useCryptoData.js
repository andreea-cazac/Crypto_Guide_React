import {useEffect, useState} from 'react';
import {getAllCoins} from '../services/api/coinsApi';

export const useCryptoData = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const data = await getAllCoins();
                setCoins(data);
                setLastUpdated(new Date());
            } catch (error) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the crypto prices. Please check your connection or try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    return { coins, loading, errorMessage, lastUpdated };
};