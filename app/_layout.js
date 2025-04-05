import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Slot} from 'expo-router';
import { useFonts } from 'expo-font';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Geogrotesque: require('../assets/fonts/GeogrotesqueTRIAL-Bd.otf'),
    });

    if (!fontsLoaded) {
        // Render a loading indicator until fonts are loaded.
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY} // ensure this is set in your environment
            merchantIdentifier="merchant.com.yourapp" // required for Apple Pay
            urlScheme="myapp" // required for bank redirects
        >
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#fff"
                        translucent={false}
                    />
                    <Slot />
                </SafeAreaView>
            </SafeAreaProvider>
        </StripeProvider>
    );
}