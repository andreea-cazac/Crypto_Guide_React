// tests/screens/login.test.js
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../../app/login';
import { loginApi } from '../../services/api/authApi';
import { jwtDecode } from 'jwt-decode';

jest.mock('jwt-decode', () => ({
    __esModule: true,
    jwtDecode: jest.fn(), // <-- important: named export
}));



// Mock AsyncStorage default export
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
    },
}));

// Stub useRouter so that router.push is available.
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({ push: mockPush }),
    __esModule: true,
}));

// Instead of mocking global.fetch, mock the loginApi module.
jest.mock('../../services/api/authApi', () => ({
    loginApi: jest.fn(),
}));


describe('LoginScreen Component', () => {
    beforeEach(() => {
        loginApi.mockClear();
        AsyncStorage.setItem.mockClear();
        mockPush.mockClear();
    });

    it('shows validation error when fields are empty', () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        const { getByText } = render(<LoginScreen />);
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);
        expect(alertSpy).toHaveBeenCalledWith(
            "Validation Error",
            "Please fill in all the fields correctly."
        );
        alertSpy.mockRestore();
    });

    it('calls login API and stores token on successful login', async () => {
        jwtDecode.mockReturnValue({
            role: [{ authority: 'ROLE_user' }],
        });

        loginApi.mockResolvedValueOnce({
            token: 'fake-jwt-token',
            activeSubscription: false,
        });

        const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

        fireEvent.press(getByText('Login'));

        await waitFor(() =>
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('jwtToken', 'fake-jwt-token')
        );
        await waitFor(() =>
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('activeSubscription', 'false')
        );
        await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/main'));
    });


    it('displays an error alert on failed login', async () => {
        loginApi.mockRejectedValueOnce(new Error('Invalid credentials'));
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

        const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

        fireEvent.press(getByText('Login'));

        await waitFor(() =>
            expect(alertSpy).toHaveBeenCalledWith("Login Failed", "Invalid credentials")
        );
        alertSpy.mockRestore();
    });

    it('shows validation error when password is missing', () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        // Leave password empty
        fireEvent.press(getByText('Login'));
        expect(alertSpy).toHaveBeenCalledWith(
            'Validation Error',
            'Please fill in all the fields correctly.'
        );
        alertSpy.mockRestore();
    });

    it('redirects to dashboard if user is admin', async () => {
        jwtDecode.mockReturnValue({
            role: [{ authority: 'ROLE_admin' }],
        });

        loginApi.mockResolvedValueOnce({
            token: 'admin-jwt-token',
            activeSubscription: true,
        });

        const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'admin@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'adminpass');

        fireEvent.press(getByText('Login'));

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'));
    });

});
