import React from 'react';
import { render } from '@testing-library/react-native';
import ArticleContentCard from '../../../components/exchange/ArticleContentCard';

describe('ArticleContentCard', () => {
    it('renders text content if not table article', () => {
        const { getByText } = render(
            <ArticleContentCard title="Some Article" content="Hello World" tableData={[]} />
        );
        expect(getByText('Some Article')).toBeTruthy();
        expect(getByText('Hello World')).toBeTruthy();
    });

    it('renders table when article title is List of DEX Platforms', () => {
        const { getByText } = render(
            <ArticleContentCard
                title="List of DEX Platforms"
                content=""
                tableData={[
                    { index: 1, name: 'Uniswap', market_share: '12%' },
                ]}
            />
        );
        expect(getByText('Uniswap')).toBeTruthy();
        expect(getByText('12%')).toBeTruthy();
    });
});