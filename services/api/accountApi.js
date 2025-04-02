// services/api/accountApi.js
import api from '../interceptor/axiosInterceptor';

export const updatePasswordApi = async (email, currentPassword, newPassword) => {
    try {
        const response = await api.put('/auth/updatePassword', {
            email,
            currentPassword,
            newPassword,
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.error || 'Failed to update password');
    }
};
