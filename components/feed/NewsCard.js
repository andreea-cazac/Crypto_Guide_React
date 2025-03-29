import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';
import { getValidImageSource } from '../../utils/imageDisplay';
import { convertUnixToDate, formatDate, formatTime, getTimeAgo } from '../../utils/formatDateTime';

export default function NewsCard({ title, source, imageUrl, readingTime, publishedOn }) {
    const publishedDateObj = convertUnixToDate(publishedOn);
    const time = formatTime(publishedDateObj);
    const date = formatDate(publishedDateObj);
    const timeAgo = getTimeAgo(publishedDateObj);

    return (
        <View style={styles.newsItem}>
            <View style={styles.newsContent}>
                <Image source={getValidImageSource(imageUrl)} style={styles.newsImage} resizeMode="contain" />
                <View style={styles.textContent}>
                    <View>
                        <Text style={styles.newsTitle}>{title}</Text>
                    </View>
                    <Text style={styles.timeAgo}>{timeAgo}</Text>
                    <Text style={styles.newsTime}>{readingTime} min read</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    newsItem: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: GlobalStyle.colors.background,
        borderRadius: 8,
    },
    newsContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    newsImage: {
        width: 150,
        height: 150,
        borderRadius: 4,
        marginRight: 12,
    },
    textContent: {
        flex: 1,
        justifyContent: 'space-between',
        height: 150,
    },
    newsTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 4,
    },
    newsSource: {
        fontSize: 12,
        color: GlobalStyle.colors.subtleText,
        marginBottom: 12,
    },
    newsTime: {
        fontSize: 12,
        color: GlobalStyle.colors.subtleText,
        alignSelf: 'flex-end',
    },
    publishedOn: {
        fontSize: 10,
        color: '#888',
        marginBottom: 4,
    },
    timeAgo: {
        fontSize: 12,
        color: '#aaa',
        fontStyle: 'italic',
    },
});