import React, { useEffect, useState } from 'react';
import { View, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [_, setClientSecret] = useState('');
    const [isReady, setIsReady] = useState(false); // Controls if button should appear
    const router = useRouter();

    useEffect(() => {
        fetchPaymentSheetParams();
    }, []);

    const showErrorAlert = (title, message) => {
        return new Promise(resolve => {
            Alert.alert(title, message, [
                {
                    text: 'OK',
                    onPress: () => resolve(),
                },
            ]);
        });
    };

    const handleError = async (title, message) => {
        await showErrorAlert(title, message);
        setLoading(false);
        router.push('/account');
    };

    const fetchPaymentSheetParams = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_PAYMENT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'testuser@example.com',
                    priceId: process.env.EXPO_PUBLIC_STRIPE_PRICE_ID,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return await handleError('Error', errorData.error || 'Something went wrong');
            }

            const { paymentIntent, ephemeralKey, customer } = await response.json();

            const initResponse = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntent,
                customerEphemeralKeySecret: ephemeralKey,
                customerId: customer,
                merchantDisplayName: 'CryptoGuide',
                returnURL: 'myapp://stripe-redirect',
            });

            if (initResponse.error) {
                return await handleError('Error', initResponse.error.message);
            }

            setClientSecret(paymentIntent);
            setIsReady(true);
        } catch (error) {
            return await handleError('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            await handleError(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your subscription is confirmed!');
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {!loading && isReady && (
                <Button title="Subscribe" onPress={openPaymentSheet} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});