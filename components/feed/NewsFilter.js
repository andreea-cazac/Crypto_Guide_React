import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../../constants/GlobalStyle';

export default function NewsFilter({ selectedFilter, onChangeFilter }) {
    const filters = [
        { label: 'Most Recent', value: 'recent' },
        { label: 'Shortest Read', value: 'shortest' },
        { label: 'Longest Read', value: 'longest' },
    ];

    return (
        <View style={styles.container}>
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter.value}
                    style={[
                        styles.button,
                        selectedFilter === filter.value && styles.activeButton,
                    ]}
                    onPress={() => onChangeFilter(filter.value)}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            selectedFilter === filter.value && styles.activeText,
                        ]}
                    >
                        {filter.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'space-around',
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: GlobalStyle.colors.primaryTransparent,
    },
    activeButton: {
        backgroundColor: GlobalStyle.colors.primary,
    },
    buttonText: {
        fontSize: 12,
        color: GlobalStyle.colors.primary,
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});