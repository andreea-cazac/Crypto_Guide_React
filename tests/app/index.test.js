// eslint-disable-next-line no-unused-vars
import { Text } from 'react-native';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Index from '../../app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

// ✅ Mock expo-router Redirect
jest.mock('expo-router', () => {
    const React = require('react');
    const { Text } = require('react-native');
    const PropTypes = require('prop-types');

    const Redirect = (props) => React.createElement(Text, null, props.href);

    Redirect.propTypes = {
        href: PropTypes.string.isRequired,
    };

    return {
        Redirect,
        __esModule: true,
    };
});

// ✅ Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

// ✅ Mock jwt-decode
jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

describe('Index', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to login if token is missing', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);

        const { getByText } = render(<Index />);
        await waitFor(() => {
            expect(getByText('/login')).toBeTruthy();
        });
    });

    it('redirects to dashboard if user is admin', async () => {
        AsyncStorage.getItem.mockResolvedValue('mock.token');
        jwtDecode.mockReturnValue({
            sub: 'admin@example.com',
            role: [{ authority: 'ROLE_admin' }],
        });

        const { getByText } = render(<Index />);
        await waitFor(() => {
            expect(getByText('/dashboard')).toBeTruthy();
        });
    });

    it('redirects to main if user is not admin', async () => {
        AsyncStorage.getItem.mockResolvedValue('mock.token');
        jwtDecode.mockReturnValue({
            sub: 'user@example.com',
            role: [{ authority: 'ROLE_user' }],
        });

        const { getByText } = render(<Index />);
        await waitFor(() => {
            expect(getByText('/main')).toBeTruthy();
        });
    });

    it('redirects to login if token decoding throws', async () => {
        AsyncStorage.getItem.mockResolvedValue('broken.token');
        jwtDecode.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const { getByText } = render(<Index />);
        await waitFor(() => {
            expect(getByText('/login')).toBeTruthy();
        });
    });
});