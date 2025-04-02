import React from 'react';
import { render } from '@testing-library/react-native';
import AccountScreen from '../../app/account';
import { useAccountScreen } from '../../hooks/useAccountScreen';

// Mock the useAccountScreen hook so that we can override its return values.
jest.mock('../../hooks/useAccountScreen');
// Mock AsyncStorage default export
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
    },
}));

describe('AccountScreen Rendering', () => {
    const defaultMock = {
        isAdmin: false,
        showUpdateForm: false,
        currentPassword: '',
        newPassword: '',
        setCurrentPassword: jest.fn(),
        setNewPassword: jest.fn(),
        handleShowUpdateForm: jest.fn(),
        handleCancelUpdate: jest.fn(),
        handleConfirmUpdate: jest.fn(),
        handleSubscribe: jest.fn(),
        handleUserRoleTest: jest.fn(),
        handleDashboard: jest.fn(),
        logout: jest.fn(),
    };

    beforeEach(() => {
        // By default, return the default mock.
        useAccountScreen.mockReturnValue(defaultMock);
    });

    it('renders Subscribe and Update Password buttons when update form is hidden', () => {
        const { getByText, queryByPlaceholderText, queryByText } = render(<AccountScreen />);
        expect(getByText('Subscribe')).toBeTruthy();
        expect(getByText('Update Password')).toBeTruthy();
        // Admin buttons should not render when isAdmin is false.
        expect(queryByText('User Role Test')).toBeNull();
        expect(queryByText('Dashboard')).toBeNull();
        // Update form inputs should not render.
        expect(queryByPlaceholderText('Current Password')).toBeNull();
        expect(queryByPlaceholderText('New Password')).toBeNull();
    });

    it('renders update form when showUpdateForm is true', () => {
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            showUpdateForm: true,
        });
        const { getByPlaceholderText, getByText } = render(<AccountScreen />);
        expect(getByPlaceholderText('Current Password')).toBeTruthy();
        expect(getByPlaceholderText('New Password')).toBeTruthy();
        expect(getByText('Confirm Update')).toBeTruthy();
        expect(getByText('Cancel')).toBeTruthy();
    });

    it('renders admin-only buttons when isAdmin is true', () => {
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            isAdmin: true,
        });
        const { getByText } = render(<AccountScreen />);
        expect(getByText('User Role Test')).toBeTruthy();
        expect(getByText('Dashboard')).toBeTruthy();
    });
});
