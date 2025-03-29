import React from 'react';
import { render } from '@testing-library/react-native';
import CryptoCard from '../../../components/feed/CryptoCard';

describe('CryptoCard', () => {
    it('displays symbol, price, and percentage', () => {
        const { getByText } = render(
            <CryptoCard
                symbol="BTC"
                price={45000}
                percentChange24h={1.5}
                lastUpdated={new Date()}
                iconUrl={null}
            />
        );

        expect(getByText(/BTC \$45000\.00/)).toBeTruthy();
        expect(getByText(/\+1.50%/)).toBeTruthy();
    });
});