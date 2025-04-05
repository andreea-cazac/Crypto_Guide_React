import React from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from '../components/Header';
import {GlobalStyle} from '../constants/GlobalStyle';
import {useAccountScreen} from '../hooks/useAccountScreen';
import {handleCancelSubscription} from '../hooks/cancelSubscription'; // adjust path if needed
import {useRouter} from 'expo-router';
import CustomButton from '../components/CustomButton';

export default function AccountScreen() {
    const router = useRouter();
    const {
        isAdmin,
        showUpdateForm,
        currentPassword,
        newPassword,
        setCurrentPassword,
        setNewPassword,
        handleShowUpdateForm,
        handleCancelUpdate,
        handleConfirmUpdate,
        handleSubscribe,
        handleUserRoleTest,
        handleDashboard,
        logout,
        isSubscribed,
    } = useAccountScreen();

    return (
        <View testID="AccountScreen" style={styles.container}>
            <Header showBack={true} showAccount={false} />

            <View style={styles.content}>
                <View style={styles.topSection}>
                <Image
                    source={require('../assets/icons/account.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Account</Text>

                <View style={styles.buttonContainer}>
                    {!isAdmin && (
                        isSubscribed ? (
                        <CustomButton
                            label="Cancel Subscription"
                            onPress={() => {
                                Alert.alert(
                                    "Cancel Subscription",
                                    "Are you sure you want to cancel your subscription?",
                                    [
                                        {
                                            text: "No",
                                            style: "cancel",
                                        },
                                        {
                                            text: "Yes",
                                            style: "destructive",
                                            onPress: () => handleCancelSubscription(() => router.replace('/account')),
                                        },
                                    ]
                                );
                            }}
                        />
                    ) : (
                        <CustomButton label="View Subscriptions" icon={require('../assets/icons/subscription.png')} onPress={handleSubscribe} />
                    ))}

                    {!showUpdateForm && (
                        <CustomButton label="Update Password"  icon={require('../assets/icons/credentials.png')} onPress={handleShowUpdateForm} />
                    )}

                    {showUpdateForm && (
                        <View style={styles.updateForm}>
                            <TextInput
                                style={styles.input}
                                placeholder="Current Password"
                                placeholderTextColor="#333"
                                secureTextEntry
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor="#333"
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <View style={styles.buttonRow}>
                                <CustomButton label="Confirm" onPress={handleConfirmUpdate} small />
                                <CustomButton label="Cancel" onPress={handleCancelUpdate} small secondary />
                            </View>
                        </View>
                    )}

                    {isAdmin && (
                        <>
                            <CustomButton label="User Role Test" icon={require('../assets/icons/preview.png')} onPress={handleUserRoleTest} />
                            <CustomButton label="Dashboard" icon={require('../assets/icons/dashboard.png')} onPress={handleDashboard} />
                        </>
                    )}
                </View>
            </View>
                <View style={styles.logoutContainer}>
                    <CustomButton label="Logout" icon={require('../assets/icons/logout.png')} onPress={logout} danger />
                </View>
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
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 12,
        tintColor: GlobalStyle.colors.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 24,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        backgroundColor: GlobalStyle.colors.primary,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    smallButton: {
        width: '48%',
    },
    secondaryButton: {
        backgroundColor: GlobalStyle.colors.secondary,
    },
    dangerButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: GlobalStyle.colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: GlobalStyle.colors.primary,
    },
    dangerText: {
        color: GlobalStyle.colors.background,
    },
    updateForm: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: GlobalStyle.colors.background,
        borderColor: GlobalStyle.colors.subtleText,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 8,
    },
    topSection: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    logoutContainer: {
        marginTop: 16,
        alignItems: 'center',
        width: '100%',
    },
});