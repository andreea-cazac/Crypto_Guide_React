import React from 'react';
import { render } from '@testing-library/react-native';
import CategoryScreen from '../../../app/education/category';
import { useLocalSearchParams } from 'expo-router';

// Inline mock for useLocalSearchParams
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
}));

jest.mock('../../../components/education/ArticleTitleCard', () => {
    const MockCard = (props) => <mock-article-title-card testID="article-title-card" {...props} />;
    MockCard.displayName = 'MockArticleTitleCard';
    return MockCard;
});

jest.mock('../../../components/Header', () => {
    const MockHeader = (props) => <mock-header testID="header" {...props} />;
    MockHeader.displayName = 'MockHeader';
    return MockHeader;
});

jest.mock('../../../components/NavigationBar', () => {
    const MockNavBar = (props) => <mock-navigation-bar testID="navigation-bar" {...props} />;
    MockNavBar.displayName = 'MockNavigationBar';
    return MockNavBar;
});

// We'll also use a dummy GlobalStyle (if needed) but here it's already imported in the component.
describe('CategoryScreen', () => {
    const title = 'Category Title';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Header, NavigationBar and the category title, and shows empty message when no articles are provided', () => {
        // Simulate no articles passed via the URL.
        useLocalSearchParams.mockReturnValue({ title, articles: undefined });

        const { getByTestId, getByText } = render(<CategoryScreen />);

        // Check that Header and NavigationBar are rendered.
        expect(getByTestId('header')).toBeTruthy();
        expect(getByTestId('navigation-bar')).toBeTruthy();

        // Check that the category title is rendered (inside a Text element).
        expect(getByText(title)).toBeTruthy();

        // With no articles, it should show the empty message.
        expect(getByText('No articles found in this category.')).toBeTruthy();
    });

    it('renders ArticleTitleCard for each article when articles are provided', () => {
        // Create sample articles array.
        const articlesArray = [
            { title: 'Article 1', content: 'Content 1' },
            { title: 'Article 2', content: 'Content 2' },
        ];
        // Pass articles as JSON string.
        useLocalSearchParams.mockReturnValue({
            title,
            articles: JSON.stringify(articlesArray),
        });

        const { getByText, getAllByTestId, queryByText } = render(<CategoryScreen />);

        // Check that the category title is rendered.
        expect(getByText(title)).toBeTruthy();
        // The empty message should NOT be present.
        expect(queryByText('No articles found in this category.')).toBeNull();

        // Verify that an ArticleTitleCard is rendered for each article.
        const cards = getAllByTestId('article-title-card');
        expect(cards.length).toBe(articlesArray.length);

        // Optionally, check that the first ArticleTitleCard received the correct props
        const firstCardProps = cards[0].props;
        expect(firstCardProps.title).toBe('Article 1');
        expect(firstCardProps.content).toBe('Content 1');
        // Also, the index prop is set (we use index as key so it should be 0 for the first card).
        expect(firstCardProps.index).toBe(0);
    });
});
