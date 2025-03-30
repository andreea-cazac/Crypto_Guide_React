import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';
import MessageBanner from '../MessageBanner';
import CryptoCard from './CryptoCard';

export default function CryptoNowSection({ coins, loading, errorMessage, lastUpdated }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        coins.find((c) => c.symbol === 'BTC') && {
            ...coins.find((c) => c.symbol === 'BTC'),
            iconUrl: require('../../assets/icons/bitcoin.png'),
        },
        coins.find((c) => c.symbol === 'ETH') && {
            ...coins.find((c) => c.symbol === 'ETH'),
            iconUrl: require('../../assets/icons/ethereum.png'),
        },
    ].filter(Boolean);

    return (
        <View>
            <Text style={GlobalStyle.components.title}>Crypto Now</Text>

            {errorMessage && <MessageBanner {...errorMessage} />}
            {loading && <ActivityIndicator  testID="crypto-loading" size="large" />}

            {cards.length > 0 && (
                <>

                    <CryptoCard
                        iconUrl={cards[currentIndex].iconUrl}
                        symbol={cards[currentIndex].symbol}
                        price={cards[currentIndex].price}
                        percentChange24h={cards[currentIndex].percent_change_24h}
                        lastUpdated={lastUpdated}
                        key={cards[currentIndex].symbol}
                    />
                    <View style={styles.cardNavigation}>
                        <Text
                            style={[styles.arrow, currentIndex === 0 && { opacity: 0.3 }]}
                            onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                        >
                            ←
                        </Text>

                        <View style={styles.centeredTextWrapper}>
                            <Text style={styles.subtleText}>Click on arrows to see more coins</Text>
                        </View>

                        <Text
                            style={[styles.arrow, currentIndex === cards.length - 1 && { opacity: 0.3 }]}
                            onPress={() => setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1))}
                        >
                            →
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // important
        marginBottom: 12,
        marginTop: 12,
        paddingHorizontal: 12,
    },
    arrow: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
    },
    centeredTextWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtleText: {
        fontSize: 12,
        color: GlobalStyle.colors.subtleText,
        textAlign: 'center',
    },
});