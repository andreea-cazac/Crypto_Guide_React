import { useEffect, useState } from 'react';
import { getLatestNews, getLocalNews } from '../services/api/newsApi';
import { useApiConfig } from './useApiConfig';

export const useNewsData = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const { config, loading: configLoading } = useApiConfig();

    useEffect(() => {
        if (configLoading) return;
        const fetchNews = async () => {
            try {
                const data =
                    config.news === 'external' ? await getLatestNews() : await getLocalNews();
                setNews(data);
            } catch (err) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message:
                        'We couldn’t load the news. Please check your connection or try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [config, configLoading]);

    return { news, loading, errorMessage };
};
