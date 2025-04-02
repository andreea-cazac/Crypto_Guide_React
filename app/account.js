// screens/account.js
import React from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import Header from '../components/Header';
import { GlobalStyle } from '../constants/GlobalStyle';
import { useAccountScreen } from '../hooks/useAccountScreen';

export default function AccountScreen() {
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
    } = useAccountScreen();

    return (
        <View testID="AccountScreen" style={styles.container}>
            <Header showBack={true} showAccount={false} />
            <View style={styles.content}>
                <Button title="Subscribe" onPress={handleSubscribe} />
                {/* Update Password Section */}
                {!showUpdateForm && (
                    <Button title="Update Password" onPress={handleShowUpdateForm} />
                )}
                {showUpdateForm && (
                    <View style={styles.updateForm}>
                        <TextInput
                            style={styles.input}
                            placeholder="Current Password"
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <View style={styles.buttonRow}>
                            <Button title="Confirm Update" onPress={handleConfirmUpdate} />
                            <Button title="Cancel" onPress={handleCancelUpdate} color="gray" />
                        </View>
                    </View>
                )}
                {/* Logout Button */}
                <Button title="Logout" color="red" onPress={logout} />
                {/* Admin-only buttons */}
                {isAdmin && (
                    <>
                        <Button title="User Role Test" onPress={handleUserRoleTest} />
                        <Button title="Dashboard" onPress={handleDashboard} />
                    </>
                )}
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
    updateForm: {
        marginVertical: 16,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: GlobalStyle.colors.background,
        borderColor: GlobalStyle.colors.subtleText,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
