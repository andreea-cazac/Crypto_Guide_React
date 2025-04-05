import React from 'react';
import { render } from '@testing-library/react-native';
import NewsDetailsScreen from '../../../app/news/details'; // adjust path if needed
import { useLocalSearchParams } from 'expo-router';
import { calculateReadingTime } from '../../../utils/calcReadingTime';

// Mock useLocalSearchParams from expo-router
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
}));

// Mock calculateReadingTime so we can control its output.
jest.mock('../../../utils/calcReadingTime', () => ({
    calculateReadingTime: jest.fn(),
}));

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

jest.mock('../../../components/feed/NewsCard', () => {
    const MockNewsCard = (props) => <mock-news-card testID="news-card" {...props} />;
    MockNewsCard.displayName = 'MockNewsCard';
    return MockNewsCard;
});

describe('NewsDetailsScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when readingTime is provided', () => {
        const params = {
            title: 'Test News Title',
            source: 'Test Source',
            imageUrl: 'http://test.com/image.jpg',
            readingTime: '5 min',
            publishedOn: '2022-01-01',
            body: 'Test news content'
        };
        useLocalSearchParams.mockReturnValue(params);

        const { getByTestId } = render(<NewsDetailsScreen />);

        // Verify Header receives correct props
        const header = getByTestId('header');
        expect(header).toBeTruthy();
        expect(header.props.showBack).toBe(true);
        expect(header.props.showAccount).toBe(true);

        // Verify NavigationBar is rendered
        expect(getByTestId('navigation-bar')).toBeTruthy();

        // Verify NewsCard receives correct props:
        const newsCard = getByTestId('news-card');
        expect(newsCard).toBeTruthy();
        expect(newsCard.props.title).toBe(params.title);
        expect(newsCard.props.source).toBe(params.source);
        expect(newsCard.props.imageUrl).toBe(params.imageUrl);
        expect(newsCard.props.publishedOn).toBe(params.publishedOn);
        expect(newsCard.props.content).toBe(params.body);
        expect(newsCard.props.showContent).toBe(true);
        // Since readingTime is provided, it should use that value.
        expect(newsCard.props.readingTime).toBe(params.readingTime);
        // And the calculateReadingTime function should not be called.
        expect(calculateReadingTime).not.toHaveBeenCalled();
    });

    it('calculates readingTime when not provided', () => {
        const params = {
            title: 'Test News Title',
            source: 'Test Source',
            imageUrl: 'http://test.com/image.jpg',
            readingTime: null,
            publishedOn: '2022-01-01',
            body: 'This is the content of the news article'
        };
        useLocalSearchParams.mockReturnValue(params);

        const fakeReadingTime = '7 min';
        calculateReadingTime.mockReturnValue(fakeReadingTime);

        const { getByTestId } = render(<NewsDetailsScreen />);

        // Verify NewsCard uses calculated readingTime
        const newsCard = getByTestId('news-card');
        expect(newsCard).toBeTruthy();
        expect(newsCard.props.readingTime).toBe(fakeReadingTime);
        // Ensure calculateReadingTime was called with the article body.
        expect(calculateReadingTime).toHaveBeenCalledWith(params.body);
    });
});
