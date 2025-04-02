import { calculateReadingTime } from '../../utils/calcReadingTime';

describe('calculateReadingTime', () => {
    it('returns at least 1 minute for short content', () => {
        expect(calculateReadingTime('Hello world')).toBe(1);
    });

    it('calculates reading time for long content', () => {
        const text = 'word '.repeat(600); 
        expect(calculateReadingTime(text)).toBe(4);
    });

    it('returns 1 for empty or undefined body', () => {
        expect(calculateReadingTime('')).toBe(1);
        expect(calculateReadingTime(undefined)).toBe(1);
        expect(calculateReadingTime(null)).toBe(1);
    });
});
