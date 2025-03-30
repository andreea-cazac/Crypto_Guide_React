import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {calculateReadingTime} from '../../utils/calcReadingTime';
import DynamicTable from '../DynamicTable';
import MessageBanner from '../MessageBanner';

export default function ArticleContentCard({ title, content, tableData, errorMessage }) {
    const readingTime = calculateReadingTime(content);
    const isTableArticle = ['List of DEX Platforms'].includes(title);

    return (

        <ScrollView style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.readingTime}>{readingTime} min read</Text>

            {errorMessage && <MessageBanner {...errorMessage} />}

            {isTableArticle && tableData?.length > 0 ? (
                <DynamicTable columns={['Index', 'Name', 'Market_share']} data={tableData} />
            ) : (
                <Text style={styles.content}>{content}</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalStyle.colors.background,
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: GlobalStyle.colors.primary,
    },
    readingTime: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 20,
        color: GlobalStyle.colors.subtleText,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: GlobalStyle.colors.primary,
    },
});
