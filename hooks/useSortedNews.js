import { useMemo } from 'react';

export const useSortedNews = (news = [], selectedFilter) => {
    return useMemo(() => {
        if (!news.length) return [];

        if (selectedFilter === 'shortest') {
            return [...news].sort((a, b) => a.body.length - b.body.length);
        } else if (selectedFilter === 'longest') {
            return [...news].sort((a, b) => b.body.length - a.body.length);
        } else {
            return [...news].sort((a, b) => b.published_on - a.published_on);
        }
    }, [news, selectedFilter]);
};