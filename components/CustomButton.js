import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {GlobalStyle} from '../constants/GlobalStyle';

export default function CustomButton({ label, onPress, icon = null, small = false, secondary = false, danger = false }) {
    const ICON_SIZE = 30;

    const renderIcon = () => {
        if (!icon) return null;

        if (React.isValidElement(icon)) {
            // Clone vector icon with custom color and size
            return React.cloneElement(icon, {
                size: ICON_SIZE,
            });
        }

        // Default image-based icon styling
        return (
            <Image
                source={icon}
                style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: GlobalStyle.colors.background }}
                resizeMode="contain"
            />
        );
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                small && styles.smallButton,
                secondary && styles.secondaryButton,
                danger && styles.dangerButton
            ]}
            onPress={onPress}
        >
            <View style={styles.content}>
                {icon && <View style={styles.icon}>{renderIcon()}</View>}
            <Text
                style={[
                    styles.buttonText,
                    secondary && styles.secondaryText,
                    danger && styles.dangerText
                ]}
            >
                {label}
            </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        minWidth: 250,
        paddingVertical: 20,
        backgroundColor: GlobalStyle.colors.primary,
        borderRadius: 40,
        marginBottom: 12,
        alignItems: 'center',
    },
    smallButton: {
        minWidth: 120,
        paddingVertical: 10,
        borderRadius: 20,
    },
    secondaryButton: {
        backgroundColor: GlobalStyle.colors.secondary,
    },
    dangerButton: {
        backgroundColor: GlobalStyle.colors.errorColor,
    },
    buttonText: {
        color: GlobalStyle.colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: GlobalStyle.colors.primary,
    },
    dangerText: {
        color: GlobalStyle.colors.background,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    icon: {
        marginRight: 6,
    },
});