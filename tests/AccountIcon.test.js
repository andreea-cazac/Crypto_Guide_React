import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountIcon from '../components/AccountIcon';

jest.mock('expo-router', () => {
    // Define pushMock inside the factory so it’s in scope.
    const pushMock = jest.fn();
    return {
        useRouter: () => ({
            push: pushMock,
        }),
        __esModule: true,
        pushMock,
    };
});

// Now require the exported pushMock from the mocked module.
const { pushMock } = require('expo-router');

describe('AccountIcon Component', () => {
    // Reset the mock before each test.
    beforeEach(() => {
        pushMock.mockClear();
    });

    it('should render correctly', () => {
        const { getByRole } = render(<AccountIcon />);
        // Ensure the Image element has accessibilityRole="image" in the component.
        expect(getByRole('image')).toBeTruthy();
    });

    it('should navigate to /account when pressed', () => {
        // Use a testID to easily find the TouchableOpacity.
        const { getByTestId } = render(<AccountIcon testID="account-icon" />);
        fireEvent.press(getByTestId('account-icon'));
        expect(pushMock).toHaveBeenCalledWith('/account');
    });
});