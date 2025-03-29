export const convertUnixToDate = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp * 1000); // Convert seconds to milliseconds
};

export const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const formatTime = (date) => {
    if (!date) return '';
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const getTimeAgo = (date) => {
    if (!date) return '';

    const now = new Date();
    const diffMs = now - date;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (diffMs >= year) {
        const years = Math.floor(diffMs / year);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (diffMs >= month) {
        const months = Math.floor(diffMs / month);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (diffMs >= day) {
        const days = Math.floor(diffMs / day);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffMs >= hour) {
        const hours = Math.floor(diffMs / hour);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffMs >= minute) {
        const minutes = Math.floor(diffMs / minute);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
};