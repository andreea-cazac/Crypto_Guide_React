// tests/EducationScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EducationScreen from '../../app/education';
import { useRouter } from 'expo-router';

// Mock useRouter from expo-router to spy on router.push
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('EducationScreen', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        // Return a router with push mocked for each test
        useRouter.mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders header and title correctly', () => {
        const { getByTestId, getByText } = render(<EducationScreen />);
        expect(getByTestId('EducationScreen')).toBeTruthy();
        expect(getByText('Education')).toBeTruthy();
    });

    it('calls router.push with "/glossary" when Glossary card is pressed', () => {
        const { getByText } = render(<EducationScreen />);
        // Find the card by its title text "Glossary"
        const glossaryCardTitle = getByText('Glossary');
        fireEvent.press(glossaryCardTitle);
        expect(mockPush).toHaveBeenCalledWith('/glossary');
    });

    it('renders at least two EducationCategoryCards with correct titles', () => {
        const { getByText } = render(<EducationScreen />);
        expect(getByText('Glossary')).toBeTruthy();
        expect(getByText('Exchange')).toBeTruthy();
    });
});