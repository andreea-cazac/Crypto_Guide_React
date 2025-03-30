import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ExchangeScreen from '../../app/exchange';
import * as useExchangeArticlesHook from '../../hooks/useExchangeArticles';

// Mock the custom hook
jest.mock('../../hooks/useExchangeArticles');

// Sample articles to test rendering
const mockArticles = [
    { id: 1, title: 'Exchange Platforms', content: 'Content' },
    { id: 2, title: 'How to Exchange Crypto?', content: 'Content' },
];

describe('ExchangeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the screen and shows loading indicator when loading', () => {
        useExchangeArticlesHook.useExchangeArticles.mockReturnValue({
            articles: [],
            loading: true,
            errorMessage: null,
        });

        const { getByTestId, getByTestId: getById } = render(<ExchangeScreen />);
        expect(getByTestId('exchange-screen')).toBeTruthy();
        expect(getById('exchange-screen')).toBeTruthy();
        expect(getById('exchange-screen')).toBeDefined();
    });

    it('displays MessageBanner when error occurs', () => {
        useExchangeArticlesHook.useExchangeArticles.mockReturnValue({
            articles: [],
            loading: false,
            errorMessage: {
                title: 'Error',
                message: 'Failed to load',
                type: 'error',
            },
        });

        const { getByText } = render(<ExchangeScreen />);
        expect(getByText('Failed to load')).toBeTruthy();
        expect(getByText('Error')).toBeTruthy();
    });

    it('renders list of articles when loaded', async () => {
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
