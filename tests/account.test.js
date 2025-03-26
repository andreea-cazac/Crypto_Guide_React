import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountScreen from '../app/account';

// Stub useRouter so that router.push is available.
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    __esModule: true,
}));

describe('AccountScreen', () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it('renders a Subscribe button', () => {
        const { getByText } = render(<AccountScreen />);
        expect(getByText('Subscribe')).toBeTruthy();
    });

    it('navigates to /payment when Subscribe is pressed', () => {
        const { getByText } = render(<AccountScreen />);
        const subscribeButton = getByText('Subscribe');
        fireEvent.press(subscribeButton);
        expect(mockPush).toHaveBeenCalledWith('/payment');
    });
});