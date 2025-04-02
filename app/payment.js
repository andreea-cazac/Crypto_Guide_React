// screens/payment.js
import React from 'react';
import {ActivityIndicator, Button, StyleSheet, View} from 'react-native';
import {GlobalStyle} from '../constants/GlobalStyle';
import {usePaymentSheetInit} from '../hooks/usePaymentSheetInit';
import Header from "../components/Header";

export default function PaymentScreen() {
    const { loading, isReady, openPaymentSheet } = usePaymentSheetInit();

    return (
        <View style={styles.container}>
            {/* Always show the back arrow so user can cancel */}
            <Header showBack={true} showAccount={false} />
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
        backgroundColor: GlobalStyle.colors.background,
    },
    backArrow: {
        position: 'absolute',
        top: 40,
        left: 16,
    },
});
