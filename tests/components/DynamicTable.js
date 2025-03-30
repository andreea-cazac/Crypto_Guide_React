import React from 'react';
import { render } from '@testing-library/react-native';
import DynamicTable from '../../components/DynamicTable';

describe('DynamicTable', () => {
    const columns = ['Index', 'Name', 'Market_share'];
    const data = [
        { index: 1, name: 'Uniswap', market_share: '20%' },
        { index: 2, name: 'Raydium', market_share: '10%' },
    ];

    it('renders table with headers and rows', () => {
        const { getByText } = render(<DynamicTable columns={columns} data={data} />);

        columns.forEach(col => expect(getByText(col)).toBeTruthy());
        data.forEach(row => {
            expect(getByText(row.name)).toBeTruthy();
            expect(getByText(row.market_share)).toBeTruthy();
        });
    });
});