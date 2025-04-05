import React, {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {useRouter} from 'expo-router';
import {jwtDecode} from 'jwt-decode';
import {useLogin} from '../hooks/useLogin';
import {GlobalStyle} from "../constants/GlobalStyle";

export default function LoginScreen() {
    const router = useRouter();
    const { login, loading, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = async () => {
        setEmailError(false);
        setPasswordError(false);

        if (!email.trim()) {
            setEmailError(true);
        } else if (!emailRegex.test(email.trim())) {
            setEmailError(true);
        }
        if (!password.trim()) setPasswordError(true);

        if (!email.trim() || !password.trim() || !emailRegex.test(email.trim())) {
            Alert.alert("Validation Error", "Please fill in all the fields correctly.");
            return;
        }

        try {
            const data = await login(email, password);
            const decoded = jwtDecode(data.token);
            const roles = decoded.role;
            const isAdmin = roles &&
                Array.isArray(roles) &&
                roles.some(roleObj => roleObj.authority === 'ROLE_admin');

            if (isAdmin) {
                router.push('/dashboard');
            } else {
                router.push('/main');
            }
        } catch (err) {
            Alert.alert("Login Failed", err.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
            <Image
                source={require('../assets/icons/crypto_guide_logo.png')}
                style={styles.logo}
            />
            <Text style={GlobalStyle.components.title}>Welcome to Crypto Guide</Text>
            <View style={styles.form}>
                <TextInput
                    style={[styles.input, (emailError && styles.errorInput)]}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={GlobalStyle.colors.subtleText}
                />
                <TextInput
                    style={[styles.input, passwordError && styles.errorInput]}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={GlobalStyle.colors.subtleText}
                />
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color={GlobalStyle.colors.primary}
                        style={styles.loader}
                    />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                )}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            </ScrollView>
        </TouchableWithoutFeedback>
</KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: GlobalStyle.colors.background,
        },
    form: {
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: GlobalStyle.colors.background,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: GlobalStyle.colors.subtleText,
        fontSize: 16,
    },
    errorInput: {
        borderColor: GlobalStyle.colors.errorColor,
    },
    button: {
        height: 50,
        backgroundColor: GlobalStyle.colors.primary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: GlobalStyle.colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        marginTop: 8,
    },
    errorText: {
        color: GlobalStyle.colors.errorColor,
        textAlign: 'center',
        marginTop: 8,
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 24,
        alignSelf: 'center',
    },
});
