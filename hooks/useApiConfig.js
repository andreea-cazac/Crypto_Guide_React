import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CONFIG_KEY = 'apiConfig';
const defaultConfig = {
    news: 'external',
    coins: 'external'
};

export const useApiConfig = () => {
    const [config, setConfig] = useState(defaultConfig);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const storedConfig = await AsyncStorage.getItem(CONFIG_KEY);
                if (storedConfig) {
                    setConfig(JSON.parse(storedConfig));
                }
            } catch (error) {
                console.error('Failed to load API config', error);
            } finally {
                setLoading(false);
            }
        };
        loadConfig();
    }, []);

    const updateConfig = async (newConfig) => {
        try {
            await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
            setConfig(newConfig);
        } catch (error) {
            console.error('Failed to update API config', error);
        }
    };

    return { config, updateConfig, loading };
};
