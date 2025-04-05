import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {useRouter} from 'expo-router';
import {useAccountActions} from './useAccountActions';

export const useAccountScreen = () => {
    const router = useRouter();
    const { updatePassword, logout } = useAccountActions();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const checkRole = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                if (token && token.split('.').length === 3) {
                    const decoded = jwtDecode(token);
                    const roles = decoded.role;
                    const admin = roles && Array.isArray(roles) && roles.some(r => r.authority === 'ROLE_admin');
                    setIsAdmin(admin);
                    setIsSubscribed(decoded.activeSubscription === true);
                }
            } catch (_error) {
// Intentionally left blank
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

    const handleSubscribe = async () => {
        //const token = await AsyncStorage.getItem('jwtToken');
        router.push('/payment');
    }

    const handleUserRoleTest = () => {
        router.push('/main');
    };

    const handleDashboard = () => router.push('/dashboard');

    return {
        isAdmin,
        isSubscribed,
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
