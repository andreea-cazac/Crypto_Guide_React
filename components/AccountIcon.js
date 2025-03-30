import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useRouter } from 'expo-router';
import accountIcon from '../assets/icons/account.png';
import { GlobalStyle } from '../constants/GlobalStyle';

export default function AccountIcon({ style, imageStyle }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push('/account')}
            accessibilityRole="image"
            testID="account-btn"
            style={style}
        >
            <Image
                testID="account-icon"
                source={accountIcon}
                style={[styles.icon, imageStyle]}
            />
        </TouchableOpacity>
    );
}

AccountIcon.propTypes = {
    style: PropTypes.object,
    imageStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 40,
        tintColor: GlobalStyle.colors.primary,
    },
});