import { groupDexByBaseName } from '../../utils/groupByDexByBaseName';

describe('groupDexByBaseName', () => {
    it('groups DEXes by base name and sums market share', () => {
        const input = [
            { name: 'Uniswap v2', market_share: '10' },
            { name: 'Uniswap v3', market_share: '15' },
            { name: 'SushiSwap', market_share: '5' },
        ];

        const result = groupDexByBaseName(input);

        expect(result.get('Uniswap').marketShare).toBe(25);
        expect(result.get('SushiSwap').marketShare).toBe(5);
    });

    it('handles missing market_share or empty input gracefully', () => {
        const input = [{ name: 'Balancer v1' }, { name: 'Balancer v2', market_share: '3.5' }];
        const result = groupDexByBaseName(input);

        expect(result.get('Balancer').marketShare).toBe(3.5);
        expect(groupDexByBaseName([])).toEqual(new Map());
        expect(groupDexByBaseName()).toEqual(new Map());
    });

    it('parses complex names with ( or / correctly', () => {
        const input = [{ name: 'Curve (Ethereum)', market_share: '4' }, { name: 'Curve/Polygon', market_share: '6' }];
        const result = groupDexByBaseName(input);
        expect(result.get('Curve').marketShare).toBe(10);
    });
});
