// 📁 app/exchange.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useExchangeArticles } from '../hooks/useExchangeArticles';
import ArticleTitleCard from '../components/exchange/ArticleTitleCard';
import { GlobalStyle } from '../constants/GlobalStyle';
import BackArrow from "../components/BackArrow";
import MessageBanner from '../components/MessageBanner';

export default function ExchangeScreen() {
    const { articles, loading, errorMessage } = useExchangeArticles();

    return (
        <View testID={"exchange-screen"} style={styles.container}>
            <BackArrow />

            <Text style={GlobalStyle.components.title}>Exchange</Text>

            <ScrollView style={styles.content}>
            {loading && <ActivityIndicator size="large" />}
            {errorMessage && <MessageBanner {...errorMessage} />}

                {articles.map((article, index) => (
                    <ArticleTitleCard
                        key={article.id}
                        index={index}
                        title={article.title}
                        content={article.content}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
});