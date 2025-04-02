// hooks/usePaymentSheetInit.js
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { getPaymentSheetParams } from '../services/api/paymentApi';

export const usePaymentSheetInit = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Shows an alert and returns a promise that resolves after dismissal.
    const showErrorAlert = (title, message) => {
        return new Promise(resolve => {
            Alert.alert(title, message, [{ text: 'OK', onPress: () => resolve() }]);
        });
    };

    // Handle errors: display alert, stop loading, and navigate away using router.replace.
    // Using router.replace ensures that the PaymentScreen is removed from the navigation stack.
    const handleError = async (title, message) => {
        await showErrorAlert(title, message);
        setLoading(false);
        router.replace('/account');
    };

    // Fetch payment sheet parameters from the backend and initialize Stripe.
    const fetchPaymentSheetParams = async () => {
        setLoading(true);
        try {
            // Get the Stripe price ID from your configuration.
            const priceId = Constants.expoConfig?.extra?.stripePriceId;
            if (!priceId) throw new Error('Stripe price ID is not defined');

            // Retrieve the stored JWT token.
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) throw new Error('User is not logged in');

            // Decode the token to extract the email (assuming the subject holds the email).
            const decoded = jwtDecode(token);
            const email = decoded.sub;

            // Fetch payment sheet parameters.
            const data = await getPaymentSheetParams(email, priceId, 1);
            const { paymentIntent, ephemeralKey, customer } = data;

            // Initialize Stripe payment sheet.
            const initResponse = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntent,
                customerEphemeralKeySecret: ephemeralKey,
                customerId: customer,
                merchantDisplayName: 'CryptoGuide',
                returnURL: 'myapp://stripe-redirect',
            });

            if (initResponse.error) {
                await handleError('Error', initResponse.error.message);
                return;
            }

            setIsReady(true);
        } catch (error) {
            await handleError('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentSheetParams();
    }, []);

    // Function to open the payment sheet.
    const openPaymentSheetHandler = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            await handleError(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your subscription is confirmed!');
            // After a successful subscription, replace the screen to remove the PaymentScreen.
            router.replace('/account');
        }
    };

    return { loading, isReady, openPaymentSheet: openPaymentSheetHandler };
};
