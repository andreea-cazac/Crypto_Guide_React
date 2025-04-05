import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {GlobalStyle} from "../../constants/GlobalStyle";

const EducationCategoryCard = ({ title, icon, onPress }) => {
    const isGlossary = title.toLowerCase() === 'glossary';

    return (
        <TouchableOpacity
            accessibilityRole="button"
            style={[
                styles.cardContainer,
                isGlossary && { backgroundColor: GlobalStyle.colors.secondary }
            ]}
            onPress={onPress}
        >
            <Image
                source={icon}
                testID="education-icon"
                style={[
                    styles.icon,
                    isGlossary && { tintColor: GlobalStyle.colors.primary }
                ]}
                resizeMode="contain"
            />
            <Text
                style={[
                    styles.title,
                    isGlossary && { color: GlobalStyle.colors.primary }
                ]}
            >
                {title}
            </Text>
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
        backgroundColor: GlobalStyle.colors.primary,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 10,
        tintColor: GlobalStyle.colors.secondary,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: GlobalStyle.colors.secondary,
    },
});

export default EducationCategoryCard;