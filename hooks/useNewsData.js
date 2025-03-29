import {useEffect, useState} from 'react';
import {getLatestNews} from '../services/api/newsApi';

export const useNewsData = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getLatestNews();
                setNews(data);
            } catch (err) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the news. Please check your connection or try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return { news, loading, errorMessage };
};