import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {GlobalStyle} from '../../constants/GlobalStyle';
import ArticleTitleCard from '../../components/education/ArticleTitleCard';
import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";

export default function CategoryScreen() {
    const { title, articles } = useLocalSearchParams();

    const parsedArticles = articles ? JSON.parse(articles) : [];

    return (
        <View style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.titleWrapper}>
            <Text style={GlobalStyle.components.title}>{title}</Text>
            </View>

        <ScrollView style={styles.container}>
            {parsedArticles.length === 0 ? (
                <Text style={styles.emptyText}>No articles found in this category.</Text>
            ) : (
                parsedArticles.map((article, index) => (
                    <ArticleTitleCard
                        key={index}
                        title={article.title}
                        content={article.content}
                        index={index}
                    />
                ))
            )}
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
    content: {
        padding: 16,
        backgroundColor: GlobalStyle.colors.background,
    },
    titleWrapper: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 14,
        color: GlobalStyle.colors.subtleText,
        marginTop: 16,
    },
});
