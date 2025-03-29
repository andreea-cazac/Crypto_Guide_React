import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {formatDate, formatTime} from '../../utils/formatDateTime';

export default function CryptoCard({ iconUrl, symbol, price, percentChange24h, lastUpdated }) {
    return (
        <View style={styles.card}>
            <View style={styles.symbolAndPriceRow}>
                {iconUrl && (
                    <Image
                        source={iconUrl}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                )}
            <Text style={styles.symbolAndPrice}>
                {symbol} ${price.toFixed(2)}
            </Text>
            </View>

            {lastUpdated && (
                <Text style={styles.lastUpdated}>
                    Last Updated: {formatTime(lastUpdated)}, {formatDate(lastUpdated)}
                </Text>
            )}

            <View style={styles.last24hContainer}>
                <Text style={styles.last24hLabel}>Last 24h: </Text>
                <Text
                    style={[
                        styles.percentChange,
                        {
                            color: percentChange24h >= 0 ? 'green' : 'red'
                        }
                    ]}
                >
                    {percentChange24h >= 0 ? '+' : ''}
                    {percentChange24h.toFixed(2)}%
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalStyle.colors.background,
        padding: 16,
        borderRadius: 12,
        shadowColor: GlobalStyle.colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    symbolAndPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 5,
    },
    symbolAndPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    lastUpdated: {
        fontSize: 14,
        color: GlobalStyle.colors.primary,
        marginBottom: 20,
    },
    last24hContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    last24hLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
    },
    percentChange: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});