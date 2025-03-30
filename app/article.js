import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ArticleContentCard from '../components/exchange/ArticleContentCard';
import BackArrow from '../components/BackArrow';
import { useResolvedArticleContent } from '../hooks/useResolvedArticleContent';
import NavigationBar from '../components/NavigationBar';
import {GlobalStyle} from "../constants/GlobalStyle";
import Header from "../components/Header";

export default function ArticleScreen() {
    const { title, content } = useLocalSearchParams();
    const { resolvedContent, tableData, errorMessage } = useResolvedArticleContent(title, content);

    return (
        <View style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.content}>
                <ArticleContentCard
                    title={title}
                    content={resolvedContent}
                    tableData={tableData}
                    errorMessage={errorMessage}
                />
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
        paddingTop: 16,
    },
});