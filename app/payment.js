import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../constants/GlobalStyle';
import {usePaymentSheetInit} from '../hooks/usePaymentSheetInit';
import Header from "../components/Header";
import CustomButton from '../components/CustomButton';

export default function PaymentScreen() {
    const { loading, isReady, openPaymentSheet } = usePaymentSheetInit();

    return (
        <View style={styles.container}>
            <Header showBack={true} showAccount={false} />

            <Text style={styles.title}>Our Subscription</Text>

            <View style={styles.card}>
                <Text style={styles.subscriptionTitle}>Basic Subscription</Text>
                <Text style={styles.description}>
                    Get access to a private Telegram group hosted by a crypto expert.
                    Chat with other crypto beginners from our app and receive daily support and tips.
                </Text>
                <Text style={styles.price}>€5/month</Text>
                <Text style={styles.note}>You can cancel at any time.</Text>
            </View>

            {loading && <ActivityIndicator size="large" color={GlobalStyle.colors.primary} />}
            {!loading && isReady && (
                <View style={styles.buttonWrapper}>
                    <CustomButton label="Subscribe" onPress={openPaymentSheet} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        backgroundColor: GlobalStyle.colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: GlobalStyle.colors.secondary,
        marginBottom: 32,
    },
    subscriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: GlobalStyle.colors.primary,
        marginBottom: 12,
        lineHeight: 22,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: GlobalStyle.colors.primary,
        marginBottom: 4,
    },
    note: {
        fontSize: 14,
        fontStyle: 'italic',
        color: GlobalStyle.colors.subtleText,
    },
    buttonWrapper: {
        alignItems: 'center',
    },
});
