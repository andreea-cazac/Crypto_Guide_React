import { useEffect, useState } from 'react';
import api from "../services/interceptor/axiosInterceptor";

export const useNewsData = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setLoading(true);
        setErrorMessage(null);

        (async () => {
            try {
                const response = await api.get('/news');
                const data = response.data;

                if (!Array.isArray(data) || data.length === 0) {
                    setErrorMessage({
                        title: 'Oops! Something went wrong',
                        message: 'We couldn’t load the news. Please try again later.',
                        type: 'error',
                    });
                    setNews([]);
                } else {
                    setNews(data);
                }
            } catch (_err) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the news. Please try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { news, loading, errorMessage };
};