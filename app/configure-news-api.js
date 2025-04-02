// app/configure-news-api.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { GlobalStyle } from '../constants/GlobalStyle';
import { useApiConfig } from '../hooks/useApiConfig';
import { useRouter } from 'expo-router';

export default function ConfigureNewsApiScreen() {
    const { config, updateConfig, loading } = useApiConfig();
    const router = useRouter();

    const handlePress = (value) => {
        const newConfig = { ...config, news: value };
        updateConfig(newConfig);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={GlobalStyle.colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header showBack={true} showAccount={false} title="Configure News API" />
            <View style={styles.content}>
                <Text style={styles.title}>Choose News API Source</Text>
                <TouchableOpacity
                    style={config.news === 'external' ? styles.activeButton : styles.inactiveButton}
                    onPress={() => handlePress('external')}
                >
                    <Text style={config.news === 'external' ? styles.activeButtonText : styles.inactiveButtonText}>
                        External
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={config.news === 'local' ? styles.activeButton : styles.inactiveButton}
                    onPress={() => handlePress('local')}
                >
                    <Text style={config.news === 'local' ? styles.activeButtonText : styles.inactiveButtonText}>
                        Local
                    </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: GlobalStyle.colors.primary,
        textAlign: 'center',
    },
    activeButton: {
        width: '80%',
        padding: 15,
        backgroundColor: GlobalStyle.colors.primary,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    inactiveButton: {
        width: '80%',
        padding: 15,
        backgroundColor: GlobalStyle.colors.subtleText,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    activeButtonText: {
        color: GlobalStyle.colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
    inactiveButtonText: {
        color: GlobalStyle.colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
