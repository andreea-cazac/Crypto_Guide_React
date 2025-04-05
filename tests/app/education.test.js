import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EducationScreen from '../../app/education';
import { useRouter } from 'expo-router';
import { getAllCategories } from '../../services/api/categoryApi';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../services/api/categoryApi');

describe('EducationScreen', () => {
    const mockPush = jest.fn();
    // Define some sample categories with articles for testing.
    const mockCategories = [
        { id: '1', name: 'Test1', articles: [{ id: 'a1', title: 'Article 1' }] },
        { id: '2', name: 'Test2', articles: [{ id: 'a2', title: 'Article 2' }] },
    ];

    beforeEach(() => {
        // Ensure router.push is available.
        useRouter.mockReturnValue({ push: mockPush });
        // Make getAllCategories resolve successfully.
        getAllCategories.mockResolvedValue(mockCategories);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders header and title correctly', async () => {
        const { getByTestId, getByText } = render(<EducationScreen />);
        await waitFor(() => expect(getByTestId('EducationScreen')).toBeTruthy());
        await waitFor(() => expect(getByText('Education')).toBeTruthy());
    });

    it('calls router.push with "/glossary" when Glossary card is pressed', async () => {
        const { getByText } = render(<EducationScreen />);
        // Wait for the loading to finish and for the Glossary card to appear.
        await waitFor(() => getByText('Glossary'));
        const glossaryCardTitle = getByText('Glossary');
        fireEvent.press(glossaryCardTitle);
        expect(mockPush).toHaveBeenCalledWith('/glossary');
    });

    it('calls router.push with category details when Wallets card is pressed', async () => {
        const { getByText } = render(<EducationScreen />);
        // Wait for the "Exchange" card to appear.
        await waitFor(() => getByText('Test1'));
        const exchangeCard = getByText('Test1');
        fireEvent.press(exchangeCard);
        expect(mockPush).toHaveBeenCalledWith({
            pathname: '/education/category',
            params: {
                title: 'Test1',
                articles: JSON.stringify([{ id: 'a1', title: 'Article 1' }])
            },
        });
    });

    it('renders Glossary', async () => {
        const { getByText } = render(<EducationScreen />);
        await waitFor(() => {
            expect(getByText('Glossary')).toBeTruthy();
        });
    });

    // If you want to test another category (for example, "Other"), update the test accordingly.
    it('calls router.push with category details when Other card is pressed', async () => {
        const { getByText } = render(<EducationScreen />);
        await waitFor(() => getByText('Test2'));
        const otherCard = getByText('Test2');
        fireEvent.press(otherCard);
        expect(mockPush).toHaveBeenCalledWith({
            pathname: '/education/category',
            params: {
                title: 'Test2',
                articles: JSON.stringify([{ id: 'a2', title: 'Article 2' }])
            },
        });
    });
});