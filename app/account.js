import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BackArrow from '../components/BackArrow';

export default function AccountScreen() {
    const router = useRouter();
    return (
        <View testID="AccountScreen" style={styles.container}>
            <BackArrow />
            <Button title="Subscribe" onPress={() => router.push('/payment')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
