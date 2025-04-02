// hooks/useAccountActions.js
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {jwtDecode} from 'jwt-decode';
import { updatePasswordApi } from '../services/api/accountApi';

export const useAccountActions = () => {
    const router = useRouter();

    const updatePassword = (currentPassword, newPassword, onSuccess) => {
        if (!currentPassword.trim() || !newPassword.trim()) {
            Alert.alert('Validation Error', 'Please fill in both current and new password fields.');
            return;
        }
        Alert.alert(
            'Confirm Update',
            'Are you sure you want to update your password?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('jwtToken');
                            if (!token) {
                                Alert.alert('Error', 'User not logged in');
                                return;
                            }
                            const decoded = jwtDecode(token);
                            const email = decoded.sub;
                            await updatePasswordApi(email, currentPassword, newPassword);
                            Alert.alert('Success', 'Password updated successfully!');
                            if (onSuccess) onSuccess();
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        }
                    },
                },
            ]
        );
    };

    const logout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await AsyncStorage.clear();
                        router.replace('/login');
                    },
                },
            ]
        );
    };

    return { updatePassword, logout };
};
