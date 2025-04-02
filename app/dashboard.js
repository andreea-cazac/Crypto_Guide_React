// app/dashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyle } from '../constants/GlobalStyle';
import { useRouter } from 'expo-router';
import Header from "../components/Header";

export default function DashboardScreen() {
    const router = useRouter();

    const handleNewsApiPress = () => {
        router.push('/configure-news-api');
    };

    const handleCryptoApiPress = () => {
        router.push('/configure-crypto-api');
    };

    return (
        <View style={styles.container}>
            <Header showBack={false} showAccount={true} />
            <View style={styles.content}>
                <Text style={styles.title}>Configure External APIs</Text>

                <TouchableOpacity style={styles.button} onPress={handleNewsApiPress}>
                    <Text style={styles.buttonText}>News API</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCryptoApiPress}>
                    <Text style={styles.buttonText}>Crypto Prices API</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
        paddingTop: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        marginTop: 150,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: GlobalStyle.colors.primary,
        alignSelf: 'center'
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: GlobalStyle.colors.primary,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: GlobalStyle.colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
