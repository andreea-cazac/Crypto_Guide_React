import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import GlossaryCard from "./GlossaryCard";

const MessageBanner = ({ type = 'info', title, message }) => {
    const isError = type === 'error';
    const isSuccess = type === 'success';

    return (
        <View
            style={[
                styles.container,
                isError && styles.error,
                isSuccess && styles.success,
            ]}
        >
            {title ? <Text style={styles.title}>{title}</Text> : null}
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    error: {
        backgroundColor: '#ffe5e5',
        borderColor: '#cc0000',
    },
    success: {
        backgroundColor: '#e5ffe5',
        borderColor: '#00aa00',
    },
    title: {
        fontSize: 18, // bigger
        fontWeight: 'bold',
        color: Colors.style.primary,
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
    },
});

export default MessageBanner;