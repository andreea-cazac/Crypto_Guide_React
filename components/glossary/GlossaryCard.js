import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';

const GlossaryCard = ({ term, meaning }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.term}>{term}</Text>
            <Text style={styles.meaning}>{meaning}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: GlobalStyle.colors.background
    },
    term: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 6,
    },
    meaning: {
        fontSize: 14,
        color: GlobalStyle.colors.primary,
        lineHeight: 20,
    },
});

export default GlossaryCard;