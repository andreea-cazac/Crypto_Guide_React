import {
    convertUnixToDate,
    formatDate,
    formatTime,
    getTimeAgo,
} from '../../utils/formatDateTime';

describe('formatDateTime utils', () => {
    describe('convertUnixToDate', () => {
        it('returns null for falsy input', () => {
            expect(convertUnixToDate(null)).toBeNull();
            expect(convertUnixToDate(undefined)).toBeNull();
        });

        it('converts timestamp to Date object', () => {
            const date = convertUnixToDate(1609459200); // 1 Jan 2021
            expect(date instanceof Date).toBe(true);
            expect(date.getFullYear()).toBe(2021);
        });
    });

    describe('formatDate', () => {
        it('returns empty string for null input', () => {
            expect(formatDate(null)).toBe('');
        });

        it('formats a Date object into dd-mm-yyyy', () => {
            const date = new Date(2021, 0, 5); // Jan 5, 2021
            expect(formatDate(date)).toBe('05-01-2021');
        });
    });

    describe('formatTime', () => {
        it('returns empty string for null input', () => {
            expect(formatTime(null)).toBe('');
        });

        it('formats a Date object into HH:mm', () => {
            const date = new Date(2021, 0, 1, 9, 5); // 09:05
            expect(formatTime(date)).toBe('09:05');
        });
    });

    describe('getTimeAgo', () => {
        const now = new Date();

        it('returns empty string for null input', () => {
            expect(getTimeAgo(null)).toBe('');
        });

        it('returns "Just now" if difference is under a minute', () => {
            const recent = new Date(now.getTime() - 30 * 1000); // 30s ago
            expect(getTimeAgo(recent)).toBe('Just now');
        });

        it('returns minutes ago', () => {
            const d = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
            expect(getTimeAgo(d)).toBe('5 minutes ago');
        });

        it('returns hours ago', () => {
            const d = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
            expect(getTimeAgo(d)).toBe('2 hours ago');
        });

        it('returns days ago', () => {
            const d = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
            expect(getTimeAgo(d)).toBe('3 days ago');
        });

        it('returns months ago', () => {
            const d = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 2 months ago
            expect(getTimeAgo(d)).toBe('2 months ago');
        });

        it('returns years ago', () => {
            const d = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000); // 2 years ago
            expect(getTimeAgo(d)).toBe('2 years ago');
        });

        it('uses singular units if 1 unit ago', () => {
            const minuteAgo = new Date(now.getTime() - 60 * 1000);
            const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

            expect(getTimeAgo(minuteAgo)).toBe('1 minute ago');
            expect(getTimeAgo(hourAgo)).toBe('1 hour ago');
            expect(getTimeAgo(dayAgo)).toBe('1 day ago');
            expect(getTimeAgo(monthAgo)).toBe('1 month ago');
            expect(getTimeAgo(yearAgo)).toBe('1 year ago');
        });
    });
});
