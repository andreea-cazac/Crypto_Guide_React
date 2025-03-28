import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

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
        backgroundColor: '#f5f5f5'
    },
    term: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.style.primary,
        marginBottom: 6,
    },
    meaning: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});

export default GlossaryCard;