import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Slot} from 'expo-router';

export default function RootLayout() {
    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY} // ensure this is set in your environment
            merchantIdentifier="merchant.com.yourapp" // required for Apple Pay
            urlScheme="myapp" // required for bank redirects
        >
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <Slot />
                </SafeAreaView>
            </SafeAreaProvider>
        </StripeProvider>
    );
}