export const getValidImageSource = (imageUrl) => {
    const fallbackImage = require('../assets/icons/image_not_found.png');

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
        return fallbackImage;
    }

    return { uri: imageUrl };
};