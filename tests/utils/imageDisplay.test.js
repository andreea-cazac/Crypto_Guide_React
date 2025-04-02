import { getValidImageSource } from '../../utils/imageDisplay';

describe('getValidImageSource', () => {
    const fallbackImage = require('../../assets/icons/image_not_found.png');

    it('returns fallback image for invalid URLs', () => {
        expect(getValidImageSource(undefined)).toBe(fallbackImage);
        expect(getValidImageSource(null)).toBe(fallbackImage);
        expect(getValidImageSource('')).toBe(fallbackImage);
        expect(getValidImageSource(123)).toBe(fallbackImage);
        expect(getValidImageSource('ftp://example.com')).toBe(fallbackImage);
    });

    it('returns uri object for valid http image', () => {
        const url = 'http://example.com/image.png';
        expect(getValidImageSource(url)).toEqual({ uri: url });
    });

    it('returns uri object for valid https image', () => {
        const url = 'https://example.com/image.png';
        expect(getValidImageSource(url)).toEqual({ uri: url });
    });
});
