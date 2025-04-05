import React from 'react';
import { render } from '@testing-library/react-native';
import ArticleScreen from '../../../app/education/article'; // adjust the path if needed
import { useLocalSearchParams } from 'expo-router';
import { useResolvedArticleContent } from '../../../hooks/useResolvedArticleContent';

// Mock the hooks so we can supply test values
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
}));

jest.mock('../../../hooks/useResolvedArticleContent', () => ({
    useResolvedArticleContent: jest.fn(),
}));

jest.mock('../../../components/education/ArticleContentCard', () => {
    const MockComponent = (props) => {
        return (
            <mock-article-content-card testID="article-content-card">
                {JSON.stringify(props)}
            </mock-article-content-card>
        );
    };
    MockComponent.displayName = 'MockArticleContentCard';
    return MockComponent;
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

describe('ArticleScreen', () => {
    const testTitle = 'Test Title';
    const testContent = 'Test Content';
    const resolvedContent = 'Resolved Content';
    const tableData = [{ id: 1, value: 'A' }];
    const errorMessage = 'Test error message';

    beforeEach(() => {
        // Set up the hook return values for testing
        useLocalSearchParams.mockReturnValue({ title: testTitle, content: testContent });
        useResolvedArticleContent.mockReturnValue({
            resolvedContent,
            tableData,
            errorMessage,
        });
    });

    it('renders Header, ArticleContentCard, and NavigationBar with correct props', () => {
        const { getByTestId } = render(<ArticleScreen />);

        // Check Header rendering and props
        const header = getByTestId('header');
        expect(header).toBeTruthy();
        expect(header.props.showBack).toBe(true);
        expect(header.props.showAccount).toBe(true);

        // Check ArticleContentCard rendering and that it receives the correct props
        const articleCard = getByTestId('article-content-card');
        expect(articleCard).toBeTruthy();
        const propsString = articleCard.children[0]; // the JSON string of props
        expect(propsString).toContain(`"title":"${testTitle}"`);
        expect(propsString).toContain(`"content":"${resolvedContent}"`);
        expect(propsString).toContain(`"tableData"`);
        expect(propsString).toContain(`"errorMessage":"${errorMessage}"`);

        // Check NavigationBar is rendered
        const navBar = getByTestId('navigation-bar');
        expect(navBar).toBeTruthy();
    });
});
