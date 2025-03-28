import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Colors} from "../constants/Colors";

const EducationCategoryCard = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity accessibilityRole="button" style={styles.cardContainer} onPress={onPress}>
            <Image source={icon} testID="education-icon" style={styles.icon} resizeMode="contain" />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 150,
        height: 150,
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginHorizontal: 10,
        backgroundColor: Colors.style.primary,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 10,
        tintColor: Colors.style.secondary,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.style.secondary,
    },
});

export default EducationCategoryCard;