import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AccountIcon from "../components/AccountIcon";
import BackArrow from "../components/BackArrow";
import {GlobalStyle} from "../constants/GlobalStyle";

export default function CommunityScreen() {
    return (
        <View testID="CommunityScreen" style={styles.container}>
                <BackArrow />
                <AccountIcon/>
            <View style={styles.content}>
                <Text style={styles.title}>Community</Text>
            </View>
            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    title: {
        fontSize: 24,
    },
});