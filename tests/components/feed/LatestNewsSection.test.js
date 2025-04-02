import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import LatestNewsSection from '../../../components/feed/LatestNewsSection';
import { useNewsData } from '../../../hooks/useNewsData';

jest.mock('../../../hooks/useNewsData');

// Mock AsyncStorage default export
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
    },
}));

describe('LatestNewsSection', () => {
    it('shows loader while loading', () => {
        useNewsData.mockReturnValue({ news: [], loading: true });
        const { getByTestId } = render(<LatestNewsSection />);
        expect(getByTestId('news-loading')).toBeTruthy();
    });

    it('renders sorted news', async () => {
        useNewsData.mockReturnValue({
            news: [
                { id: 1, title: 'Big News', body: 'Short text.', published_on: Date.now() / 1000 },
            ],
            loading: false,
        });

        const { getByText } = render(<LatestNewsSection />);
        await waitFor(() => {
            expect(getByText('Big News')).toBeTruthy();
            expect(getByText(/min read/)).toBeTruthy();
        });
    });
});