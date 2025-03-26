/* eslint-disable react/prop-types,no-unused-vars */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import PaymentScreen from '../app/payment';
import { createSubscription } from '../services/api/paymentApi';
import { Alert, Button } from 'react-native';

// Use fake timers to help control animation timers.
jest.useFakeTimers();

// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
    }),
    __esModule: true,
}));

// --- Create a test-specific CardForm ---
const TestCardForm = ({ onFormComplete }) => (
    <Button
        title="Set Card Details"
        onPress={() => onFormComplete({ complete: true })}
        testID="card-form-button"
    />
);

// Create a shared mock for createPaymentMethod.
export const mockCreatePaymentMethod = jest.fn();

// Combine all mocks for @stripe/stripe-react-native.
jest.mock('@stripe/stripe-react-native', () => {
    const React = require('react');
    return {
        useStripe: () => ({
            createPaymentMethod: mockCreatePaymentMethod,
        }),
        CardForm: TestCardForm,
        StripeProvider: ({ children, publishableKey }) => <>{children}</>,
    };
});

// Mock expo-constants
jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            stripePriceId: 'price_test',
            stripePublicKey: 'pk_test',
        },
    },
}));

// Mock the createSubscription API
jest.mock('../services/api/paymentApi', () => ({
    createSubscription: jest.fn(),
}));

// Ensure Constants are set.
// Spy on Alert so we can assert on its calls.
jest.spyOn(Alert, 'alert');

afterEach(() => {
    // Flush any pending timers inside act()
    act(() => {
        jest.runAllTimers();
    });
});

describe('PaymentScreen (PaymentContent)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show an alert if card details are incomplete', async () => {
        const { getByText } = render(<PaymentScreen />);
        const payButton = getByText('Pay');
        fireEvent.press(payButton);
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Incomplete Card Details',
                'Please fill in your card information completely.'
            );
        });
    });

    it('should show an alert if email or username is missing', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<PaymentScreen />);
        // Simulate card details completion.
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        // Fill only the username field.
        const usernameInput = getByPlaceholderText('Enter your username');
        fireEvent.changeText(usernameInput, 'john_doe');
        const payButton = getByText('Pay');
        fireEvent.press(payButton);
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Missing Information',
                'Please fill in your username and email.'
            );
        });
    });

    it('should handle a successful payment method creation and subscription', async () => {
        const paymentMethod = { id: 'pm_test' };
        mockCreatePaymentMethod.mockResolvedValue({ paymentMethod });
        const { getByText, getByPlaceholderText, getByTestId } = render(<PaymentScreen />);
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        const usernameInput = getByPlaceholderText('Enter your username');
        fireEvent.changeText(usernameInput, 'john_doe');
        const emailInput = getByPlaceholderText('Enter your email');
        fireEvent.changeText(emailInput, 'john.doe@example.com');
        const payButton = getByText('Pay');
        fireEvent.press(payButton);
        await waitFor(() => {
            expect(mockCreatePaymentMethod).toHaveBeenCalled();
            expect(createSubscription).toHaveBeenCalledWith({
                paymentMethodId: 'pm_test',
                email: 'john.doe@example.com',
                username: 'john_doe',
                priceId: 'price_test',
                numberOfLicenses: 1,
            });
            expect(Alert.alert).toHaveBeenCalledWith(
                'Subscription Successful',
                'Now you have access to the premium features!'
            );
        });
    });

    it('should handle errors during payment method creation', async () => {
        mockCreatePaymentMethod.mockResolvedValue({
            error: { message: 'Payment method error' },
        });
        const { getByText, getByPlaceholderText, getByTestId } = render(<PaymentScreen />);
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        const usernameInput = getByPlaceholderText('Enter your username');
        fireEvent.changeText(usernameInput, 'john_doe');
        const emailInput = getByPlaceholderText('Enter your email');
        fireEvent.changeText(emailInput, 'john.doe@example.com');
        const payButton = getByText('Pay');
        fireEvent.press(payButton);
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Payment Method Error',
                'Payment method error'
            );
        });
    });

    it('should handle errors during subscription creation', async () => {
        const paymentMethod = { id: 'pm_test' };
        mockCreatePaymentMethod.mockResolvedValue({ paymentMethod });
        createSubscription.mockRejectedValue(new Error('Subscription error'));
        const { getByText, getByPlaceholderText, getByTestId } = render(<PaymentScreen />);
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        const usernameInput = getByPlaceholderText('Enter your username');
        fireEvent.changeText(usernameInput, 'john_doe');
        const emailInput = getByPlaceholderText('Enter your email');
        fireEvent.changeText(emailInput, 'john.doe@example.com');
        const payButton = getByText('Pay');
        fireEvent.press(payButton);
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Error',
                'Subscription error'
            );
        });
    });

    it('should alert when createPaymentMethod returns an empty object', async () => {
        // Simulate a situation where createPaymentMethod returns {}.
        mockCreatePaymentMethod.mockResolvedValue({});
        const { getByText, getByPlaceholderText, getByTestId } = render(<PaymentScreen />);
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        // Fill username and email.
        fireEvent.changeText(getByPlaceholderText('Enter your username'), 'john_doe');
        fireEvent.changeText(getByPlaceholderText('Enter your email'), 'john.doe@example.com');
        fireEvent.press(getByText('Pay'));
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Payment Method Error',
                'No payment method returned.'
            );
        });
    });

    it('should treat whitespace-only email or username as missing', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<PaymentScreen />);
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        // Fill fields with only whitespace.
        fireEvent.changeText(getByPlaceholderText('Enter your username'), '   ');
        fireEvent.changeText(getByPlaceholderText('Enter your email'), '   ');
        fireEvent.press(getByText('Pay'));
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Missing Information',
                'Please fill in your username and email.'
            );
        });
    });

    it('should prevent multiple submissions while loading', async () => {
        // Delay resolution to simulate a slow network/API.
        mockCreatePaymentMethod.mockImplementation(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve({paymentMethod: {id: 'pm_test'}}), 500)
                )
        );
        const {getByText, getByPlaceholderText, getByTestId} = render(<PaymentScreen/>);
        await act(async () => {
            fireEvent.press(getByTestId('card-form-button'));
        });
        fireEvent.changeText(getByPlaceholderText('Enter your username'), 'john_doe');
        fireEvent.changeText(getByPlaceholderText('Enter your email'), 'john.doe@example.com');
        const payButton = getByText('Pay');

        // Press the Pay button rapidly multiple times.
        fireEvent.press(payButton);
        fireEvent.press(payButton);
        fireEvent.press(payButton);

        // Wait for resolution.
        await waitFor(() => {
            // Expect createPaymentMethod to be called only once.
            expect(mockCreatePaymentMethod).toHaveBeenCalledTimes(1);
        });
    });
});