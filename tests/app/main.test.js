import React from 'react';
import { render } from '@testing-library/react-native';
import MainScreen from '../../app/main';
import { useCryptoData } from '../../hooks/useCryptoData';
import { useNewsData } from '../../hooks/useNewsData';

jest.mock('../../hooks/useCryptoData');
jest.mock('../../hooks/useNewsData');

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