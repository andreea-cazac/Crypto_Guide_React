// 📁 components/BackArrow.js
import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useRouter } from 'expo-router';
import backArrow from '../assets/icons/back_arrow.png';
import { GlobalStyle } from '../constants/GlobalStyle';

export default function BackArrow({ style, ...props }) {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.back()} style={style} testID="back-arrow">
            <Image source={backArrow} style={styles.image} {...props} />
            <Text style={styles.label}>Back</Text>
        </TouchableOpacity>
    );
}

BackArrow.propTypes = {
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
        tintColor: GlobalStyle.colors.primary,
        marginBottom: 4,
    },
    label: {
        fontSize: 16,
        color: GlobalStyle.colors.secondary,
    },
});