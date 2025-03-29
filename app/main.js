import React from 'react';
import {StyleSheet, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AccountIcon from "../components/AccountIcon";
import {GlobalStyle} from "../constants/GlobalStyle";
import {useCryptoData} from '../hooks/useCryptoData';
import CryptoNowSection from '../components/feed/CryptoNowSection';
import LatestNewsSection from "../components/feed/LatestNewsSection";

export default function MainScreen() {
    const { coins, loading, errorMessage, lastUpdated } = useCryptoData();

    return (
        <View testID="MainScreen" style={styles.container}>
            <AccountIcon />
            <View style={styles.content}>
                <CryptoNowSection
                    coins={coins}
                    loading={loading}
                    errorMessage={errorMessage}
                    lastUpdated={lastUpdated}
                />

                <LatestNewsSection />
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
        paddingHorizontal: 16,
        paddingTop: 60,
    },
});