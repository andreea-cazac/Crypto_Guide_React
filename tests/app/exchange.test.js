import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ExchangeScreen from '../../app/exchange';
import * as useExchangeArticlesHook from '../../hooks/useExchangeArticles';

jest.mock('../../hooks/useExchangeArticles');

const mockArticles = [
    { id: 1, title: 'Exchange Platforms', content: 'Content' },
    { id: 2, title: 'How to Exchange Crypto?', content: 'Content' },
];

describe('ExchangeScreen', () => {
    it('shows loading indicator when loading', () => {
        useExchangeArticlesHook.useExchangeArticles.mockReturnValue({
            articles: [],
            loading: true,
            errorMessage: null,
        });

        const { getByTestId } = render(<ExchangeScreen />);
        expect(getByTestId('exchange-screen')).toBeTruthy();
    });

    it('shows error message when fetch fails', async () => {
        useExchangeArticlesHook.useExchangeArticles.mockReturnValue({
            articles: [],
            loading: false,
            errorMessage: 'Failed to load',
        });

        const { getByText } = render(<ExchangeScreen />);
        expect(getByText('Failed to load')).toBeTruthy();
    });

    it('renders list of articles', async () => {
        useExchangeArticlesHook.useExchangeArticles.mockReturnValue({
            articles: mockArticles,
            loading: false,
            errorMessage: null,
        });

        const { getByText } = render(<ExchangeScreen />);

        await waitFor(() => {
            expect(getByText('Exchange Platforms')).toBeTruthy();
            expect(getByText('How to Exchange Crypto?')).toBeTruthy();
        });
    });
});
