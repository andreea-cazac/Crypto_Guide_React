// app/main.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AccountIcon from "../components/AccountIcon";

export default function MainScreen() {
    return (
        <View testID="MainScreen" style={styles.container}>
                <AccountIcon />
            <View style={styles.content}>
                <Text style={styles.title}>Main Screen</Text>
            </View>
            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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