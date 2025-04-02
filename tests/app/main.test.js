import React from 'react';
import { render } from '@testing-library/react-native';
import MainScreen from '../../app/main';
import { useCryptoData } from '../../hooks/useCryptoData';
import { useNewsData } from '../../hooks/useNewsData';

jest.mock('../../hooks/useCryptoData');
jest.mock('../../hooks/useNewsData');
// Mock AsyncStorage default export
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
    },
}));

describe('MainScreen', () => {
    beforeEach(() => {
        useCryptoData.mockReturnValue({
            coins: [],
            loading: true,
            errorMessage: null,
            lastUpdated: null,
        });

        useNewsData.mockReturnValue({
            news: [],
            loading: true,
            errorMessage: null,
        });
    });

    it('renders the MainScreen container', () => {
        const { getByTestId } = render(<MainScreen />);
        expect(getByTestId('MainScreen')).toBeTruthy();
    });
});