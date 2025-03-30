import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import backArrow from '../assets/icons/back_arrow.png';
import {useRouter} from 'expo-router';
import {GlobalStyle} from '../constants/GlobalStyle';

export default function BackArrow({ style, ...props }) {
    const router = useRouter();

    const handlePress = () => {
        router.back();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.container, style]}
            testID="back-arrow"
        >
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
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop: 8,
    },
    image: {
        width: 25,
        height: 25,
        tintColor: GlobalStyle.colors.primary,
        marginBottom: 4,           // Space between icon and label
    },
    label: {
        fontSize: 16,
        color: GlobalStyle.colors.secondary,
    },
});