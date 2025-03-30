// 📁 hooks/useExchangeArticles.js
import {useEffect, useState} from 'react';
import {getAllCategories} from '../services/api/categoryApi';
import { sortArticlesById } from '../utils/sortArticlesById';

export const useExchangeArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const categories = await getAllCategories();
                const exchangeCategory = categories.find(c => c.name === 'Exchange');

                if (!exchangeCategory) {
                    setErrorMessage({
                        type: 'error',
                        title: 'Exchange category not found',
                        message: 'Please make sure the Exchange section exists in the backend.',
                    });
                    return;
                }

                const sortedArticles = sortArticlesById(exchangeCategory.articles || []);
                setArticles(sortedArticles);
            } catch (error) {
                setErrorMessage({
                    type: 'error',
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the exchange articles. Please try again later.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return { articles, loading, errorMessage };
};