export const sortArticlesById = (articles) => {
    return [...articles].sort((a, b) => a.id - b.id);
};