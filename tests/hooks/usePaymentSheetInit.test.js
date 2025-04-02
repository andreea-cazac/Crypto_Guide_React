// tests/hooks/usePaymentSheetInit.test.js
import { renderHook, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import jwtDecode from 'jwt-decode';

import { usePaymentSheetInit } from '../../hooks/usePaymentSheetInit';
import { getPaymentSheetParams } from '../../services/api/paymentApi';

jest.mock('@stripe/stripe-react-native', () => ({
    useStripe: jest.fn(),
}));

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

jest.mock('jwt-decode', () => jest.fn());

jest.mock('../../services/api/paymentApi', () => ({
    getPaymentSheetParams: jest.fn(),
}));

// Helper to flush pending promises.
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

beforeEach(() => {
    jest.clearAllMocks();
    // Reset default Constants configuration.
    Constants.expoConfig = {
        extra: {
            stripePriceId: 'test_price_id',
            payment_endpoint: 'https://example.com/payment',
        },
    };
});

// Spy on Alert.alert and immediately call the OK button callback.
jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
    if (buttons && buttons[0] && buttons[0].onPress) {
        buttons[0].onPress();
    }
});

describe('usePaymentSheetInit Hook', () => {
    let mockInitPaymentSheet;
    let mockPresentPaymentSheet;
    let mockRouterPush;
    let mockRouterReplace;

    beforeEach(() => {
        // Setup mocks for useStripe.
        mockInitPaymentSheet = jest.fn();
        mockPresentPaymentSheet = jest.fn();
        useStripe.mockReturnValue({
            initPaymentSheet: mockInitPaymentSheet,
            presentPaymentSheet: mockPresentPaymentSheet,
        });

        // Setup mock for useRouter including replace.
        mockRouterPush = jest.fn();
        mockRouterReplace = jest.fn();
        useRouter.mockReturnValue({
            push: mockRouterPush,
            replace: mockRouterReplace,
        });
    });

    test('failure flow: missing stripePriceId', async () => {
        // Reassign Constants.expoConfig with missing stripePriceId.
        Constants.expoConfig = {
            extra: {
                stripePriceId: undefined,
                payment_endpoint: 'https://example.com/payment',
            },
        };

        const { result } = renderHook(() => usePaymentSheetInit());
        await act(async () => {
            await flushPromises();
        });
        await waitFor(() => expect(result.current.loading).toBe(false));

        // The hook should trigger a redirection using replace.
        expect(mockRouterReplace).toHaveBeenCalledWith('/account');
        expect(result.current.isReady).toBe(false);
    });

    test('failure flow: missing JWT token', async () => {
        // Ensure stripePriceId is valid.
        Constants.expoConfig = {
            extra: {
                stripePriceId: 'test_price_id',
                payment_endpoint: 'https://example.com/payment',
            },
        };
        // Simulate missing JWT token.
        AsyncStorage.getItem.mockResolvedValue(null);

        const { result } = renderHook(() => usePaymentSheetInit());
        await act(async () => {
            await flushPromises();
        });
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(mockRouterReplace).toHaveBeenCalledWith('/account');
        expect(result.current.isReady).toBe(false);
    });

    test('openPaymentSheetHandler success', async () => {
        // Set up for a successful initialization.
        AsyncStorage.getItem.mockResolvedValue('valid_jwt_token');
        jwtDecode.mockReturnValue({ sub: 'user@example.com' });
        getPaymentSheetParams.mockResolvedValue({
            paymentIntent: 'pi_test',
            ephemeralKey: 'ek_test',
            customer: 'cus_test',
        });
        mockInitPaymentSheet.mockResolvedValue({});
        // Simulate successful payment sheet presentation.
        mockPresentPaymentSheet.mockResolvedValue({});

        const { result } = renderHook(() => usePaymentSheetInit());
        await act(async () => {
            await flushPromises();
        });
        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.openPaymentSheet();
        });

        expect(Alert.alert).toHaveBeenCalledWith('Success', 'Your subscription is confirmed!');
        expect(mockRouterReplace).toHaveBeenCalledWith('/account');
    });

    test('openPaymentSheetHandler failure', async () => {
        // Set up for a successful initialization.
        AsyncStorage.getItem.mockResolvedValue('valid_jwt_token');
        jwtDecode.mockReturnValue({ sub: 'user@example.com' });
        getPaymentSheetParams.mockResolvedValue({
            paymentIntent: 'pi_test',
            ephemeralKey: 'ek_test',
            customer: 'cus_test',
        });
        mockInitPaymentSheet.mockResolvedValue({});
        // Simulate an error when presenting the payment sheet.
        mockPresentPaymentSheet.mockResolvedValue({ error: { code: 'error_code', message: 'payment sheet error' } });

        const { result } = renderHook(() => usePaymentSheetInit());
        await act(async () => {
            await flushPromises();
        });
        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.openPaymentSheet();
        });

        expect(Alert.alert).toHaveBeenCalledWith(
            'Error code: error_code',
            'payment sheet error',
            expect.any(Array)
        );
        expect(mockRouterReplace).toHaveBeenCalledWith('/account');
    });
});
