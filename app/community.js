import React from 'react';
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import {GlobalStyle} from '../constants/GlobalStyle';
import Header from '../components/Header';
import {useRouter} from 'expo-router';
import {useAccountScreen} from '../hooks/useAccountScreen';

export default function CommunityScreen() {
    const router = useRouter();
    const { isSubscribed } = useAccountScreen();

    const openExternalLink = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.warn(`Don't know how to open URI: ${url}`);
            }
        } catch (err) {
            console.error("An error occurred while trying to open the URL:", err);
        }
    };

    return (
        <View testID="CommunityScreen" style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.titleWrapper}>
                <Text style={GlobalStyle.components.title}>Community</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openExternalLink('https://www.binance.com/en/community')}
                >
                    <Text style={styles.buttonText}>Binance Community</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openExternalLink('https://coinmarketcap.com/community/')}
                >
                    <Text style={styles.buttonText}>Coin Market Cap Community</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openExternalLink('https://www.reddit.com/r/BitcoinBeginners/')}
                >
                    <Text style={styles.buttonText}>Reddit community (for beginners) </Text>
                </TouchableOpacity>

                {isSubscribed && (
                    <TouchableOpacity
                        style={styles.telegramButton}
                        onPress={() => openExternalLink('https://t.me/+qcnMumAXYNw5Njg0')}
                    >
                        <Text style={styles.telegramButtonText}>Join Our Premium Telegram</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.disclaimerText}>
                    Disclaimer: While we've carefully selected trusted platforms, please always verify the links and financial advice shared in these communities. We are not responsible for any third-party content, decisions, or actions taken based on these communities. Always read terms and policies carefully.
                </Text>

                <View style={styles.faqSection}>
                    <TouchableOpacity testID="faq-button" onPress={() => router.push('/faq')}>
                        <Image
                            style={styles.faqIcon}
                            source={require('../assets/icons/questionmark.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleWrapper: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        marginVertical: 6,
        backgroundColor: GlobalStyle.colors.secondary,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
    },
    telegramButton: {
        width: '100%',
        paddingVertical: 14,
        marginVertical: 6,
        marginBottom: 10,
        backgroundColor: GlobalStyle.colors.primary,
        borderRadius: 25,
        alignItems: 'center',
    },
    telegramButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    faqSection: {
        alignItems: 'center',
    },
    faqIcon: {
        width: 40,
        height: 40,
        marginTop: 20,
    },
    disclaimerText: {
        fontSize: 12,
        color: GlobalStyle.colors.subtleText,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 10,
    },
});