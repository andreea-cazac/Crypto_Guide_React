import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                const decoded = jwtDecode(token);
                const email = decoded.sub;

                // console.log(token);
                // console.log(email);
                if (!token || !email) {
                    setRedirectPath('/login');
                    return;
                }

                const roles = decoded?.role;
                const isAdmin = Array.isArray(roles) && roles.some(r => r.authority === 'ROLE_admin');

                setRedirectPath(isAdmin ? '/dashboard' : '/main');
            } catch (_e) {
                setRedirectPath('/login');
            }
        };

        checkAuth();
    }, []);

    if (!redirectPath) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Redirect href={redirectPath} />;
}