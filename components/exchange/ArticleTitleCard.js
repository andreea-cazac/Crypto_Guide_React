import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {useRouter} from 'expo-router';

export default function ArticleTitleCard({ title, content, index }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/article', params: { title, content } })}
        >
            <Text style={styles.title}>{`${title}`}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalStyle.colors.background,
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: GlobalStyle.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        color: GlobalStyle.colors.primary,
    },
});