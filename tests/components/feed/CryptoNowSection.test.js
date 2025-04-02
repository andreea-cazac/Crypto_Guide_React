import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CryptoNowSection from '../../../components/feed/CryptoNowSection';

const mockProps = {
    coins: [
        { symbol: 'BTC', price: 50000, percent_change_24h: 2 },
        { symbol: 'ETH', price: 3000, percent_change_24h: -1 },
    ],
    loading: false,
    errorMessage: null,
    lastUpdated: new Date(),
};

describe('CryptoNowSection', () => {
    it('shows loading spinner when loading', () => {
        const { getByTestId } = render(<CryptoNowSection {...mockProps} loading />);
        expect(getByTestId('crypto-loading')).toBeTruthy();
    });

    it('renders crypto card and arrows', () => {
        const { getByText } = render(<CryptoNowSection {...mockProps} />);
        expect(getByText('Crypto Now')).toBeTruthy();
        expect(getByText(/BTC/)).toBeTruthy();
        expect(getByText(/Last 24h/)).toBeTruthy();
        expect(getByText('←')).toBeTruthy();
        expect(getByText('→')).toBeTruthy();
    });

    it('navigates to next coin on right arrow press', () => {
        const { getByText } = render(<CryptoNowSection {...mockProps} />);
        fireEvent.press(getByText('→'));
        expect(getByText(/ETH/)).toBeTruthy();
    });

});