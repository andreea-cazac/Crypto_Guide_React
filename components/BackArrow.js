// components/BackArrow.js
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import backArrow from '../assets/icons/back_arrow.png';
import { useRouter } from 'expo-router';

export default function BackArrow({ style, ...props }) {
    const router = useRouter();

    const handlePress = () => {
        router.back();
    };

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, style]} testID="back-arrow">
            <Image source={backArrow} style={styles.image} {...props} />
            <Text style={styles.label}>Back</Text>
        </TouchableOpacity>
    );
}

BackArrow.propTypes = {
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        left: 16, // Positioned at the same level as AccountIcon but on the left side
        zIndex: 10,
        alignItems: 'center', // Aligns the image and label vertically
    },
    image: {
        width: 24,
        height: 24,
    },
    label: {
        fontSize: 12,
        marginTop: 2,
        color: '#000',
    },
});