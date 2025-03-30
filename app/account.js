import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useRouter} from 'expo-router';
import Header from "../components/Header";
import {GlobalStyle} from "../constants/GlobalStyle";

export default function AccountScreen() {
    const router = useRouter();

    return (
        <View testID="AccountScreen" style={styles.container}>
            <Header showBack={true} showAccount={false} />

            <View style={styles.content}>
                <Button title="Subscribe" onPress={() => router.push('/payment')} />
            </View>
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
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
