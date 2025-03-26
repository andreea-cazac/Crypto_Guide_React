// components/AccountIcon.js
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import accountIcon from '../assets/icons/account.png';
import {useRouter} from "expo-router";

export default function AccountIcon({ style, ...props }) {

    const router = useRouter();

    const handlePress = () => {
        router.push('/account');
    };

    return (
        <TouchableOpacity onPress={handlePress}  accessibilityRole="image" testID="account-btn" style={[styles.container, style]}>
            <Image testID="account-icon" source={accountIcon} style={styles.image} {...props} />
        </TouchableOpacity>
    );
}

AccountIcon.propTypes = {
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        right: 16,
        zIndex: 10,
    },
    image: {
        width: 24,
        height: 24,
    },
});