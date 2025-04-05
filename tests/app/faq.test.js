import React from 'react';
import { render } from '@testing-library/react-native';
import FAQScreen from '../../app/faq';
import { faqItems } from '../../utils/faqData';

jest.mock('../../components/Header', () => {
    const MockHeader = (props) => <mock-header testID="header" {...props} />;
    MockHeader.displayName = 'MockHeader';
    return MockHeader;
});

jest.mock('../../components/NavigationBar', () => {
    const MockNavBar = (props) => <mock-navigation-bar testID="navigation-bar" {...props} />;
    MockNavBar.displayName = 'MockNavigationBar';
    return MockNavBar;
});

describe('FAQScreen', () => {
    it('renders the FAQ title', () => {
        const { getByText } = render(<FAQScreen />);
        expect(getByText('FAQ')).toBeTruthy();
    });

    it('renders all FAQ items with their questions and answers', () => {
        const { getByText } = render(<FAQScreen />);
        faqItems.forEach((item) => {
            expect(getByText(item.question)).toBeTruthy();
            expect(getByText(item.answer)).toBeTruthy();
        });
    });

    it('renders Header and NavigationBar components', () => {
        const { getByTestId } = render(<FAQScreen />);
        expect(getByTestId('header')).toBeTruthy();
        expect(getByTestId('navigation-bar')).toBeTruthy();
    });
});
