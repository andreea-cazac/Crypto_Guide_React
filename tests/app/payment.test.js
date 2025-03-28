import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import PaymentScreen from '../../app/payment'; // adjust the path as needed
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';

// --- Mock the hooks ---
jest.mock('@stripe/stripe-react-native', () => ({
    useStripe: jest.fn(),
}));
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('PaymentScreen', () => {
    const mockInitPaymentSheet = jest.fn();
    const mockPresentPaymentSheet = jest.fn();
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // Set up our mocks for useStripe and useRouter.
        useStripe.mockReturnValue({
            initPaymentSheet: mockInitPaymentSheet,
            presentPaymentSheet: mockPresentPaymentSheet,
        });
        useRouter.mockReturnValue({
            push: mockRouterPush,
        });

        global.fetch = jest.fn();
        jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
            // Immediately call the onPress callback of the first button, if available.
            if (buttons && buttons.length > 0 && typeof buttons[0].onPress === 'function') {
                buttons[0].onPress();
            }
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders loading indicator when fetching data', async () => {
        // Create a fetch promise that never resolves to simulate ongoing loading.
        global.fetch.mockReturnValue(new Promise(() => {}));
        const { queryByText, getByTestId } = render(<PaymentScreen />);
        // The Subscribe button should not be visible yet.
        expect(queryByText('Subscribe')).toBeNull();
    });

    it('renders Subscribe button when payment sheet parameters are fetched successfully', async () => {
        const paymentIntent = 'pi_test';
        const ephemeralKey = 'ek_test';
        const customer = 'cus_test';
        // Simulate successful fetch response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ paymentIntent, ephemeralKey, customer }),
        });
        // Simulate successful initPaymentSheet (i.e. no error)
        mockInitPaymentSheet.mockResolvedValueOnce({});

        // Render the component outside of act
        const rendered = render(<PaymentScreen />);

        // Wait for the "Subscribe" button to appear
        await waitFor(() => rendered.getByText('Subscribe'));
        expect(rendered.getByText('Subscribe')).toBeTruthy();
    });

    it('handles fetch error by showing alert and redirecting to /account', async () => {
        // Setup fetch response that simulates a server error.
        const serverError = 'Server error';
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: serverError }),
        });

        render(<PaymentScreen />);
        // Wait for the error handling to trigger (i.e. router.push should be called).
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/account');
        });
        expect(Alert.alert).toHaveBeenCalled();
    });

    it('handles presentPaymentSheet error correctly', async () => {
        // Setup a successful fetch response so that payment sheet parameters load.
        const paymentIntent = 'pi_test';
        const ephemeralKey = 'ek_test';
        const customer = 'cus_test';
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ paymentIntent, ephemeralKey, customer }),
        });
        // Simulate a successful initPaymentSheet call.
        mockInitPaymentSheet.mockResolvedValueOnce({});
        // Set up presentPaymentSheet to return an error.
        const presentError = { code: 'payment_error', message: 'Payment failed' };
        mockPresentPaymentSheet.mockResolvedValueOnce({ error: presentError });

        const rendered = render(<PaymentScreen />);
        // Wait for the Subscribe button to appear.
        await waitFor(() => {
            expect(rendered.getByText('Subscribe')).toBeTruthy();
        });
        // Press the Subscribe button.
        fireEvent.press(rendered.getByText('Subscribe'));

        // Wait for error handling: router.push should be called.
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/account');
        });
        expect(Alert.alert).toHaveBeenCalled();
    });
});