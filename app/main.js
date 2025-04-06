import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import {GlobalStyle} from "../constants/GlobalStyle";
import {useCryptoData} from '../hooks/useCryptoData';
import CryptoNowSection from '../components/feed/CryptoNowSection';
import Header from "../components/Header";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LatestNewsSection from "../components/feed/LatestNewsSection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen() {
    const { coins, loading, errorMessage, lastUpdated } = useCryptoData();
    const insets = useSafeAreaInsets();

    return (
        <View testID="MainScreen" style={styles.container}>
            <Header showBack={false} showAccount={true} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 + insets.bottom }]}
            >
                <CryptoNowSection
                    coins={coins}
                    loading={loading}
                    errorMessage={errorMessage}
                    lastUpdated={lastUpdated}
                />
                <LatestNewsSection />
            </ScrollView>

            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
});