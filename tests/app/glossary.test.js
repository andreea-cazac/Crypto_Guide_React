import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import GlossaryScreen from '../../app/glossary';
import { getAllGlossaryTerms } from '../../services/api/glossaryApi';
import { useAlphabetScroll } from '../../hooks/useAlphabetScroll';

// Mock the API call
jest.mock('../../services/api/glossaryApi', () => ({
    getAllGlossaryTerms: jest.fn(),
}));

// Mock the scroll hook so we can inspect its methods
jest.mock('../../hooks/useAlphabetScroll', () => ({
    useAlphabetScroll: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('mock.jwt.token')),
    setItem: jest.fn(),
}));

describe('GlossaryScreen', () => {
    // Sample data for a successful API response
    const sampleData = [
        { id: 1, term: 'Apple', meaning: 'A fruit.' },
        { id: 2, term: 'Ant', meaning: 'An insect.' },
        { id: 3, term: 'Banana', meaning: 'Another fruit.' },
    ];

    // Fake implementations for the alphabet scroll hook
    const fakeScrollToLetter = jest.fn();
    const fakeSectionRefs = { current: {} };
    const fakeScrollViewRef = { current: { scrollTo: jest.fn() } };

    beforeEach(() => {
        jest.clearAllMocks();
        useAlphabetScroll.mockReturnValue({
            scrollViewRef: fakeScrollViewRef,
            sectionRefs: fakeSectionRefs,
            scrollToLetter: fakeScrollToLetter,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('shows a loading indicator while fetching data', async () => {
        // Simulate a pending API call
        getAllGlossaryTerms.mockReturnValue(new Promise(() => {}));
        const { queryByText, getByText } = render(<GlossaryScreen />);
        // The title "Glossary" is rendered even during loading.
        expect(getByText('Glossary')).toBeTruthy();
        // (You can also add a testID to your ActivityIndicator to confirm its presence.)
    });

    it('renders letter bar and glossary cards when API fetch succeeds', async () => {
        getAllGlossaryTerms.mockResolvedValueOnce(sampleData);

        const { getByText, getByTestId } = render(<GlossaryScreen />);

        await waitFor(() => {
            expect(getByText('Glossary')).toBeTruthy();
        });

        // Instead of using ambiguous getByText('A'), use testIDs
        expect(getByTestId('letter-bar-A')).toBeTruthy();
        expect(getByTestId('group-header-A')).toBeTruthy();

        expect(getByTestId('letter-bar-B')).toBeTruthy();
        expect(getByTestId('group-header-B')).toBeTruthy();

        expect(getByText('Apple')).toBeTruthy();
    });

    it('calls scrollToLetter when a letter in the letter bar is pressed', async () => {
        // Simulate a successful API response.
        getAllGlossaryTerms.mockResolvedValueOnce(sampleData);

        const { getByTestId } = render(<GlossaryScreen />);

        await waitFor(() => {
            expect(getByTestId('letter-bar-A')).toBeTruthy();
        });

        // Simulate a press on the letter "A"
        fireEvent.press(getByTestId(('letter-bar-A')));
        expect(fakeScrollToLetter).toHaveBeenCalledWith('A');
    });

    it('renders an error message when the API fetch fails', async () => {
        // Simulate an API failure.
        getAllGlossaryTerms.mockRejectedValueOnce(new Error('Network Error'));

        const { getByText } = render(<GlossaryScreen />);

        // Wait for the error banner to appear.
        await waitFor(() => {
            expect(getByText('Oops! Something went wrong')).toBeTruthy();
            expect(getByText('We couldn’t load the glossary. Please check your connection or try again later.')).toBeTruthy();
        });
    });
});