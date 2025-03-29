import React from 'react';
import { render } from '@testing-library/react-native';
import NewsCard from '../../../components/feed/NewsCard';

describe('NewsCard', () => {
    it('renders title and time info', () => {
        const { getByText } = render(
            <NewsCard
                title="Test News"
                source="Some Source"
                imageUrl=""
                readingTime={3}
                publishedOn={Math.floor(Date.now() / 1000)}
            />
        );

        expect(getByText('Test News')).toBeTruthy();
        expect(getByText(/min read/)).toBeTruthy();
    });
});