import React from 'react';
import {StyleSheet, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import {GlobalStyle} from "../constants/GlobalStyle";
import {useCryptoData} from '../hooks/useCryptoData';
import CryptoNowSection from '../components/feed/CryptoNowSection';
import LatestNewsSection from "../components/feed/LatestNewsSection";
import Header from "../components/Header";

export default function MainScreen() {
    const { coins, loading, errorMessage, lastUpdated } = useCryptoData();

    return (
        <View testID="MainScreen" style={styles.container}>
            <Header showBack={false} showAccount={true} />
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
    },
});