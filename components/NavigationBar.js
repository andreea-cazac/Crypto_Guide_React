import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import educationIcon from '../assets/icons/education.png';
import feedIcon from '../assets/icons/feed.png';
import communityIcon from '../assets/icons/community.png';
import {GlobalStyle} from '../constants/GlobalStyle';

export default function NavigationBar() {
    const router = useRouter();

    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.icon} accessibilityRole="button" testID="nav-education" onPress={() => router.push('/education')}>
                <Image source={educationIcon} style={styles.iconImage} testID="education-icon"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} accessibilityRole="button" testID="nav-main" onPress={() => router.push('/main')}>
                <Image source={feedIcon} style={styles.iconImage} testID="feed-icon"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} accessibilityRole="button" testID="nav-community" onPress={() => router.push('/community')}>
                <Image source={communityIcon} style={styles.iconImage} testID="community-icon"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderColor: GlobalStyle.colors.secondary,
        backgroundColor: GlobalStyle.colors.background,
    },
    icon: {
        alignItems: 'center',
        padding: 10,
    },
    iconImage: {
        width: 40,
        height: 40,
        tintColor: GlobalStyle.colors.primary,
    },
});