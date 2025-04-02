// hooks/useAccountScreen.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';
import { useAccountActions } from './useAccountActions';
import { useApiConfig } from './useApiConfig';

export const useAccountScreen = () => {
    const router = useRouter();
    const { updatePassword, logout } = useAccountActions();
    const { config } = useApiConfig();

    const [isAdmin, setIsAdmin] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Detect admin role by decoding the JWT stored in AsyncStorage
    useEffect(() => {
        const checkRole = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                if (token) {
                    const decoded = jwtDecode(token);
                    const roles = decoded.role;
                    const admin = roles && Array.isArray(roles) && roles.some(r => r.authority === 'ROLE_admin');
                    setIsAdmin(admin);
                }
            } catch (error) {
                console.error('Error decoding token', error);
            }
        };
        checkRole();
    }, []);

    const handleShowUpdateForm = () => setShowUpdateForm(true);

    const handleCancelUpdate = () => {
        setShowUpdateForm(false);
        setCurrentPassword('');
        setNewPassword('');
    };

    const handleConfirmUpdate = () => {
        updatePassword(currentPassword, newPassword, () => {
            setShowUpdateForm(false);
            setCurrentPassword('');
            setNewPassword('');
        });
    };

    const handleSubscribe = () => router.push('/payment');

    const handleUserRoleTest = () => {
        router.push('/main');
    };

    const handleDashboard = () => router.push('/dashboard');

    return {
        isAdmin,
        showUpdateForm,
        currentPassword,
        newPassword,
        setCurrentPassword,
        setNewPassword,
        handleShowUpdateForm,
        handleCancelUpdate,
        handleConfirmUpdate,
        handleSubscribe,
        handleUserRoleTest,
        handleDashboard,
        logout,
    };
};
