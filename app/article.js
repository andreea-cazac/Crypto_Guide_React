// 📁 app/article.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ArticleContentCard from '../components/exchange/ArticleContentCard';
import BackArrow from '../components/BackArrow';
import { useResolvedArticleContent } from '../hooks/useResolvedArticleContent';

export default function ArticleScreen() {
    const { title, content } = useLocalSearchParams();
    const { resolvedContent, tableData, errorMessage } = useResolvedArticleContent(title, content);

    return (
        <View style={styles.container}>
            <BackArrow />
            <ArticleContentCard title={title} content={resolvedContent} tableData={tableData} errorMessage={errorMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        flex: 1,
        backgroundColor: 'white',
    },
});