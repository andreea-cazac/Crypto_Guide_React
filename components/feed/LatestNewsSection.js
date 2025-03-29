import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../constants/GlobalStyle';
import NewsCard from './NewsCard';
import { useNewsData } from '../../hooks/useNewsData';
import { calculateReadingTime } from '../../utils/calcReadingTime';
import NewsFilter from './NewsFilter';
import { useSortedNews } from '../../hooks/useSortedNews';
import MessageBanner from "../MessageBanner";

export default function LatestNewsSection() {
    const { news, loading , errorMessage} = useNewsData();
    const [selectedFilter, setSelectedFilter] = useState('recent');
    const sortedNews = useSortedNews(news, selectedFilter);

    return (
        <View style={styles.section}>
            <Text style={GlobalStyle.components.title}>Latest News</Text>

            {!errorMessage && (
                <NewsFilter
                    selectedFilter={selectedFilter}
                    onChangeFilter={setSelectedFilter}
                />
            )}

            {errorMessage && <MessageBanner {...errorMessage} />}

            {loading ? (
                <ActivityIndicator testID="news-loading" size="large" />
            ) : (
                <ScrollView style={styles.newsScroll}>
                    {sortedNews.map((item) => (
                        <NewsCard
                            key={item.id}
                            title={item.title}
                            source={item.source}
                            imageUrl={item.imageurl}
                            readingTime={calculateReadingTime(item.body)}
                            publishedOn={item.published_on}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    newsScroll: {
        maxHeight: 300,
    },
});
