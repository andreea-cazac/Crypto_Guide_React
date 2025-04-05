import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteSubscriptionApi} from '../services/api/deleteSubscriptionApi';
import {Alert} from 'react-native';
import {refreshToken} from './refreshToken';
import {jwtDecode} from "jwt-decode";

export const handleCancelSubscription = async (callback) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        const userEmail = decoded.sub;

        if (!userEmail) {
            throw new Error("User email not found in local storage");
        }

        await deleteSubscriptionApi(userEmail);

        await refreshToken();
        Alert.alert('Subscription Cancelled', 'Your subscription has been successfully cancelled.');

        if (callback) {
            callback();
        }
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};
