import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import NewsCard from '../../components/feed/NewsCard';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {calculateReadingTime} from '../../utils/calcReadingTime';
import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";

export default function NewsDetailsScreen() {
    const {
        title,
        source,
        imageUrl,
        readingTime,
        publishedOn,
        body
    } = useLocalSearchParams();


    return (
        <View style={styles.wrapper}>
            <Header showBack={true} showAccount={true} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <NewsCard
                    title={title}
                    source={source}
                    imageUrl={imageUrl}
                    readingTime={readingTime || calculateReadingTime(body)}
                    publishedOn={publishedOn}
                    content={body}
                    showContent={true}
                />
            </ScrollView>
            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
    },
});