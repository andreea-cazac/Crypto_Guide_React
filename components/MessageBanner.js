import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../constants/GlobalStyle';

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
        backgroundColor: GlobalStyle.colors.background,
        borderWidth: 1,
        borderColor: GlobalStyle.colors.primary,
    },
    error: {
        backgroundColor: GlobalStyle.colors.background,
        borderColor: GlobalStyle.colors.errorColor,
    },
    success: {
        backgroundColor: GlobalStyle.colors.background,
        borderColor: GlobalStyle.colors.successColor,
    },
    title: {
        fontSize: 18, // bigger
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        fontWeight: '400',
        color: GlobalStyle.colors.primary,
    },
});

export default MessageBanner;