import { useEffect, useState } from 'react';
import { getAllDexChanges } from '../services/api/dexApi';
import { groupDexByBaseName } from '../utils/groupByDexByBaseName';

export const useResolvedArticleContent = (title, content) => {
    const [resolvedContent, setResolvedContent] = useState(content);
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchDexData = async () => {
            const isDexArticle =
                title === 'List of DEX Platforms' &&
                (!content || content.trim() === '');

            if (!isDexArticle) return;

            try {
                const data = await getAllDexChanges();
                const activeDex = data.filter(dex => dex.status === 'active');
                const dexMap = groupDexByBaseName(activeDex);

                const sorted = Array.from(dexMap.entries())
                    .sort(([, a], [, b]) => b.marketShare - a.marketShare)
                    .slice(0, 10);

                const tableFormatted = sorted.map(([name, { marketShare }], index) => ({
                    index: index + 1,
                    name,
                    market_share: (marketShare * 100).toFixed(2) + '%',
                }));

                setResolvedContent('');
                setTableData(tableFormatted);
            } catch (error) {
                setResolvedContent('');
                setErrorMessage({
                    type: 'error',
                    title: 'DEX Platforms Load Error',
                    message: 'Unable to load DEX platforms at the moment. Please try again later.',
                });
            }
        };

        fetchDexData();
    }, [title, content]);

    return { resolvedContent, tableData, errorMessage };
};
