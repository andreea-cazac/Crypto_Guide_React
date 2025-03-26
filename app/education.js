// app/education.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AccountIcon from "../components/AccountIcon";
import BackArrow from "../components/BackArrow";

export default function EducationScreen() {
    return (
        <View testID="EducationScreen" style={styles.container}>
                <BackArrow />
                <AccountIcon/>
            <View style={styles.content}>
                <Text style={styles.title}>Education Screen</Text>
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