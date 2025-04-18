import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import {GlobalStyle} from '../constants/GlobalStyle';
import {useApiConfig} from '../hooks/useApiConfig';
import {handleApiSelection} from "../utils/confirmApiSwitch";

export default function ConfigureCryptoApiScreen() {
    const { config, updateConfig, loading } = useApiConfig();

    const handlePress = (value) => {
        handleApiSelection(config.coins, value, () => {
            const newConfig = { ...config, coins: value };
            updateConfig(newConfig);
        });
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
            <Header showBack={true} showAccount={false} title="Configure Crypto Prices API" />
            <View style={styles.content}>
                <Text style={styles.title}>Choose Crypto Prices API Source</Text>
                <TouchableOpacity
                    testID="external-button"
                    style={config.coins === 'external' ? styles.activeButton : styles.inactiveButton}
                    onPress={() => handlePress('external')}
                >
                    <Text style={config.coins === 'external' ? styles.activeButtonText : styles.inactiveButtonText}>
                        External
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    testID="local-button"
                    style={config.coins === 'local' ? styles.activeButton : styles.inactiveButton}
                    onPress={() => handlePress('local')}
                >
                    <Text style={config.coins === 'local' ? styles.activeButtonText : styles.inactiveButtonText}>
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
        backgroundColor: GlobalStyle.colors.background,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GlobalStyle.colors.secondary,
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
