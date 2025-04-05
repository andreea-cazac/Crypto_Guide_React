import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';
import NewsCard from './NewsCard';
import {useNewsData} from '../../hooks/useNewsData';
import {calculateReadingTime} from '../../utils/calcReadingTime';
import NewsFilter from './NewsFilter';
import {useSortedNews} from '../../hooks/useSortedNews';
import MessageBanner from "../MessageBanner";
import {useRouter} from 'expo-router';

export default function LatestNewsSection() {
    const router = useRouter();
    const { news, loading , errorMessage} = useNewsData();
    const [selectedFilter, setSelectedFilter] = useState('recent');
    const sortedNews = useSortedNews(news, selectedFilter);

    return (
        <View style={styles.section}>
            <Text style={GlobalStyle.components.title}>Latest News</Text>

            {errorMessage && <MessageBanner {...errorMessage} />}
            {!errorMessage && (
                <NewsFilter
                    selectedFilter={selectedFilter}
                    onChangeFilter={setSelectedFilter}
                />
            )}

            {loading ? (
                <ActivityIndicator testID="news-loading" size="large" />
            ) : (
                <ScrollView style={styles.newsScroll}>
                    {sortedNews.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() =>
                                router.push({
                                    pathname: '/news/details',
                                    params: {
                                        title: item.title,
                                        source: item.source,
                                        imageUrl: item.imageurl,
                                        publishedOn: item.published_on,
                                        body: item.body,
                                    },
                                })
                            }
                        >
                            <NewsCard
                                title={item.title}
                                source={item.source}
                                imageUrl={item.imageurl}
                                readingTime={calculateReadingTime(item.body)}
                                publishedOn={item.published_on}
                            />
                        </TouchableOpacity>
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
        flexGrow: 1,
    },
});
