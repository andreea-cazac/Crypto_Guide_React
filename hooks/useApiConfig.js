import {useEffect, useState} from 'react';
import api from '../services/interceptor/axiosInterceptor'; // Use the interceptor instance!

function toClientConfig(serverConfig) {
    return {
        news: serverConfig.useLocalNews ? 'local' : 'external',
        coins: serverConfig.useLocalCoins ? 'local' : 'external',
    };
}

function toServerConfig(clientConfig) {
    return {
        useLocalNews: clientConfig.news === 'local',
        useLocalCoins: clientConfig.coins === 'local',
    };
}

export const useApiConfig = () => {
    const [config, setConfig] = useState({ news: 'external', coins: 'external' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1) Fetch config from server on mount
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                // Use the interceptor instance, which attaches the token automatically.
                const response = await api.get(`/api/config`);
                const mapped = toClientConfig(response.data);
                setConfig(mapped);
            } catch (err) {
                console.error('Failed to load config from server:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // 2) Update config on the server
    const updateConfig = async (newClientConfig) => {
        try {
            setLoading(true);
            setError(null);
            const serverBody = toServerConfig(newClientConfig);
            const response = await api.put(`/api/config`, serverBody);
            const mapped = toClientConfig(response.data);
            setConfig(mapped);
        } catch (err) {
            console.error('Failed to update config on server:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { config, updateConfig, loading, error };
};
