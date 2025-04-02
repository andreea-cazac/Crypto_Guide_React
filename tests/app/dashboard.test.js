import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import DashboardScreen from '../../app/dashboard';

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({ push: mockPush }),
}));

// Mock AsyncStorage (in case Header uses it)
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
        getItem: jest.fn(),
    },
}));

describe('DashboardScreen', () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it('renders title and buttons correctly', () => {
        const { getByText } = render(<DashboardScreen />);

        expect(getByText('Configure External APIs')).toBeTruthy();
        expect(getByText('News API')).toBeTruthy();
        expect(getByText('Crypto Prices API')).toBeTruthy();
    });

    it('navigates to configure-news-api on News API button press', () => {
        const { getByText } = render(<DashboardScreen />);
        fireEvent.press(getByText('News API'));
        expect(mockPush).toHaveBeenCalledWith('/configure-news-api');
    });

    it('navigates to configure-crypto-api on Crypto Prices API button press', () => {
        const { getByText } = render(<DashboardScreen />);
        fireEvent.press(getByText('Crypto Prices API'));
        expect(mockPush).toHaveBeenCalledWith('/configure-crypto-api');
    });
});
