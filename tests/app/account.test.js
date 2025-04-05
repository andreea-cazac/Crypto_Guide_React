import React from 'react';
import { render } from '@testing-library/react-native';
import AccountScreen from '../../app/account';
import { useAccountScreen } from '../../hooks/useAccountScreen';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { handleCancelSubscription } from '../../hooks/cancelSubscription';

// Mock the useAccountScreen hook so that we can override its return values.
jest.mock('../../hooks/useAccountScreen');
// Mock AsyncStorage default export
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
    },
}));

jest.mock('../../hooks/cancelSubscription', () => ({
    handleCancelSubscription: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

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
        // Ensure isSubscribed is defined for the conditional
        isSubscribed: false,
    };

    beforeEach(() => {
        // By default, return the default mock.
        useAccountScreen.mockReturnValue(defaultMock);
    });

    it('renders View Subscriptions and Update Password buttons when update form is hidden', () => {
        const { getByText, queryByPlaceholderText, queryByText } = render(<AccountScreen />);
        // Update expectation from 'Subscribe' to 'View Subscriptions'
        expect(getByText('View Subscriptions')).toBeTruthy();
        expect(getByText('Update Password')).toBeTruthy();
        // Admin buttons should not render when isAdmin is false.
        expect(queryByText('User Role Test')).toBeNull();
        expect(queryByText('Dashboard')).toBeNull();
        // Update form inputs should not render.
        expect(queryByPlaceholderText('Current Password')).toBeNull();
        expect(queryByPlaceholderText('New Password')).toBeNull();
    });

    it('shows alert when pressing Cancel Subscription button', async () => {
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            isSubscribed: true,
        });

        const { getByText } = render(<AccountScreen />);
        const cancelButton = getByText('Cancel Subscription');
        fireEvent.press(cancelButton);

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                "Cancel Subscription",
                "Are you sure you want to cancel your subscription?",
                expect.any(Array)
            );
        });
    });

    it('renders Logout button and triggers logout on press', () => {
        const logoutMock = jest.fn();
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            logout: logoutMock,
        });

        const { getByText } = render(<AccountScreen />);
        fireEvent.press(getByText('Logout'));

        expect(logoutMock).toHaveBeenCalled();
    });

    it('triggers handleSubscribe when pressing View Subscriptions', () => {
        const handleSubscribeMock = jest.fn();
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            handleSubscribe: handleSubscribeMock,
        });

        const { getByText } = render(<AccountScreen />);
        fireEvent.press(getByText('View Subscriptions'));

        expect(handleSubscribeMock).toHaveBeenCalled();
    });

    it('renders update form when showUpdateForm is true', () => {
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            showUpdateForm: true,
        });
        const { getByPlaceholderText, getByText } = render(<AccountScreen />);
        expect(getByPlaceholderText('Current Password')).toBeTruthy();
        expect(getByPlaceholderText('New Password')).toBeTruthy();
        // Update expectation from 'Confirm Update' to 'Confirm'
        expect(getByText('Confirm')).toBeTruthy();
        expect(getByText('Cancel')).toBeTruthy();
    });

    it('triggers handleShowUpdateForm when pressing Update Password', () => {
        const showUpdateMock = jest.fn();
        useAccountScreen.mockReturnValue({
            ...defaultMock,
            handleShowUpdateForm: showUpdateMock,
        });

        const { getByText } = render(<AccountScreen />);
        fireEvent.press(getByText('Update Password'));

        expect(showUpdateMock).toHaveBeenCalled();
    });

    it('calls handleConfirmUpdate and handleCancelUpdate', () => {
        const confirmMock = jest.fn();
        const cancelMock = jest.fn();

        useAccountScreen.mockReturnValue({
            ...defaultMock,
            showUpdateForm: true,
            handleConfirmUpdate: confirmMock,
            handleCancelUpdate: cancelMock,
        });

        const { getByText } = render(<AccountScreen />);
        fireEvent.press(getByText('Confirm'));
        fireEvent.press(getByText('Cancel'));

        expect(confirmMock).toHaveBeenCalled();
        expect(cancelMock).toHaveBeenCalled();
    });

    it('calls handleCancelSubscription after confirming alert', async () => {
        const mockCallback = jest.fn();
        handleCancelSubscription.mockImplementation(mockCallback);

        Alert.alert.mockImplementation((title, message, buttons) => {
            const yesBtn = buttons.find(b => b.text === 'Yes');
            yesBtn.onPress(); // simulate user pressing 'Yes'
        });

        useAccountScreen.mockReturnValue({
            ...defaultMock,
            isSubscribed: true,
        });

        const { getByText } = render(<AccountScreen />);
        fireEvent.press(getByText('Cancel Subscription'));

        expect(handleCancelSubscription).toHaveBeenCalled();
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

    it('updates current and new password input values', () => {
        const setCurrentPassword = jest.fn();
        const setNewPassword = jest.fn();

        useAccountScreen.mockReturnValue({
            ...defaultMock,
            showUpdateForm: true,
            setCurrentPassword,
            setNewPassword,
        });

        const { getByPlaceholderText } = render(<AccountScreen />);
        fireEvent.changeText(getByPlaceholderText('Current Password'), 'oldpass123');
        fireEvent.changeText(getByPlaceholderText('New Password'), 'newpass456');

        expect(setCurrentPassword).toHaveBeenCalledWith('oldpass123');
        expect(setNewPassword).toHaveBeenCalledWith('newpass456');
    });

    it('renders the account icon and title', () => {
        const { getByText, getByTestId } = render(<AccountScreen />);
        expect(getByText('Account')).toBeTruthy();
        expect(getByTestId('AccountScreen')).toBeTruthy();
    });

    it('admin triggers handleUserRoleTest and handleDashboard', () => {
        const userRoleTestMock = jest.fn();
        const dashboardMock = jest.fn();

        useAccountScreen.mockReturnValue({
            ...defaultMock,
            isAdmin: true,
            handleUserRoleTest: userRoleTestMock,
            handleDashboard: dashboardMock,
        });

        const { getByText } = render(<AccountScreen />);
        fireEvent.press(getByText('User Role Test'));
        fireEvent.press(getByText('Dashboard'));

        expect(userRoleTestMock).toHaveBeenCalled();
        expect(dashboardMock).toHaveBeenCalled();
    });
});