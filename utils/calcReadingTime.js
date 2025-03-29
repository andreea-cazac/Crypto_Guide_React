export const calculateReadingTime = (body) => {
    const wordCount = body?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / 200));
};
