import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentScreen from '../../app/payment';
import { usePaymentSheetInit } from '../../hooks/usePaymentSheetInit';

// Mocks
jest.mock('@stripe/stripe-react-native', () => ({
    useStripe: () => ({
        initPaymentSheet: jest.fn(() => Promise.resolve({ error: null })),
        presentPaymentSheet: jest.fn(() => Promise.resolve({})),
    }),
}));

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('mock.jwt.token')),
    setItem: jest.fn(),
}));

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            stripePriceId: 'price_mock_123',
            payment_endpoint: 'https://mock.endpoint/payment',
        },
    },
}));

jest.mock('jwt-decode', () => jest.fn(() => ({ sub: 'test@example.com' })));

jest.mock('../../services/api/paymentApi', () => ({
    getPaymentSheetParams: jest.fn(() =>
        Promise.resolve({
            paymentIntent: 'pi_mock',
            ephemeralKey: 'ek_mock',
            customer: 'cus_mock',
        })
    ),
}));

jest.mock('../../hooks/usePaymentSheetInit');

describe('PaymentScreen Component', () => {
    it('renders loading indicator when loading is true', () => {
        usePaymentSheetInit.mockReturnValue({
            loading: true,
            isReady: false,
            openPaymentSheet: jest.fn(),
        });
        const { queryByText, getByTestId } = render(<PaymentScreen />);
        expect(queryByText('Subscribe')).toBeNull();
    });

    it('renders Subscribe button when ready and triggers payment', () => {
        const mockOpenPaymentSheet = jest.fn();
        usePaymentSheetInit.mockReturnValue({
            loading: false,
            isReady: true,
            openPaymentSheet: mockOpenPaymentSheet,
        });
        const { getByText } = render(<PaymentScreen />);
        const subscribeButton = getByText('Subscribe');
        expect(subscribeButton).toBeTruthy();
        fireEvent.press(subscribeButton);
        expect(mockOpenPaymentSheet).toHaveBeenCalled();
    });
});
