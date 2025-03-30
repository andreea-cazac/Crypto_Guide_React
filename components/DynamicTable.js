// 📁 components/common/DynamicTable.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyle } from '../constants/GlobalStyle';

export default function DynamicTable({ columns, data }) {
    return (
        <View style={styles.tableContainer}>
            {/* Header */}
            <View style={styles.row}>
                {columns.map((col, idx) => (
                    <Text key={idx} style={[styles.cell, styles.headerCell]}>{col}</Text>
                ))}
            </View>

            {/* Data Rows */}
            {data.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {columns.map((col, colIndex) => (
                        <Text key={colIndex} style={styles.cell}>
                            {row[col.toLowerCase()]}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: GlobalStyle.colors.primary,
        borderRadius: 8,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: GlobalStyle.colors.secondary,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: GlobalStyle.colors.primary,
    },
    headerCell: {
        fontWeight: 'bold',
    },
});