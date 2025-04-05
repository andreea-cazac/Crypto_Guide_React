import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CommunityScreen from '../../app/community';
import { useAccountScreen } from '../../hooks/useAccountScreen';
import { Linking } from 'react-native';
import { push } from 'expo-router'; // inline mock

// Inline mock for useAccountScreen
jest.mock('../../hooks/useAccountScreen', () => ({
    useAccountScreen: jest.fn(),
}));

// Inline mock for expo-router (push needs to be trackable)
jest.mock('expo-router', () => {
    const push = jest.fn();
    return {
        useRouter: () => ({ push }),
        push,
    };
});

// ✅ Properly mock both canOpenURL and openURL
jest.mock('react-native/Libraries/Linking/Linking', () => ({
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    openURL: jest.fn(() => Promise.resolve()),
}));

describe('CommunityScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAccountScreen.mockReturnValue({ isSubscribed: false });
    });

    it('renders the Community title and disclaimer', () => {
        const { getByText } = render(<CommunityScreen />);
        expect(getByText('Community')).toBeTruthy();
        expect(getByText(/Disclaimer:/)).toBeTruthy();
    });

    it('renders all external community buttons', () => {
        const { getByText } = render(<CommunityScreen />);
        expect(getByText('Binance Community')).toBeTruthy();
        expect(getByText('Coin Market Cap Community')).toBeTruthy();
        expect(getByText('Reddit community (for beginners)')).toBeTruthy();
    });

    it('opens Binance Community URL when pressed', async () => {
        const { getByText } = render(<CommunityScreen />);
        await fireEvent.press(getByText('Binance Community'));
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.binance.com/en/community');
    });

    it('opens Coin Market Cap Community URL when pressed', async () => {
        const { getByText } = render(<CommunityScreen />);
        await fireEvent.press(getByText('Coin Market Cap Community'));
        expect(Linking.openURL).toHaveBeenCalledWith('https://coinmarketcap.com/community/');
    });

    it('opens Reddit Community URL when pressed', async () => {
        const { getByText } = render(<CommunityScreen />);
        await fireEvent.press(getByText('Reddit community (for beginners)'));
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.reddit.com/r/BitcoinBeginners/');
    });

    it('renders and opens Telegram button if user is subscribed', async () => {
        useAccountScreen.mockReturnValue({ isSubscribed: true });
        const { getByText } = render(<CommunityScreen />);
        const telegramBtn = getByText('Join Our Premium Telegram');
        expect(telegramBtn).toBeTruthy();
        await fireEvent.press(telegramBtn);
        expect(Linking.openURL).toHaveBeenCalledWith('https://t.me/+qcnMumAXYNw5Njg0');
    });

    it('navigates to /faq when pressing the FAQ icon', () => {
        const { getByTestId } = render(<CommunityScreen />);
        fireEvent.press(getByTestId('faq-button'));
        expect(push).toHaveBeenCalledWith('/faq');
    });
});