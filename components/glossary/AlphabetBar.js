import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalStyle} from '../../constants/GlobalStyle';

export default function AlphabetBar({ alphabet, onLetterPress }) {
    return (
        <View style={styles.letterBar}>
            {alphabet.map((letter) => (
                <TouchableOpacity key={letter} onPress={() => onLetterPress(letter)}>
                    <Text testID={`letter-bar-${letter}`} style={styles.letter}>{letter}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    letterBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 25,
        gap: 4,
    },
    letter: {
        fontSize: 20,
        color: GlobalStyle.colors.primary,
        marginHorizontal: 4,
    },
});