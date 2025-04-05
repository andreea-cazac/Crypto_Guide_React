import { handleCancelSubscription } from '../../hooks/cancelSubscription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteSubscriptionApi } from '../../services/api/deleteSubscriptionApi';
import { refreshToken } from '../../hooks/refreshToken';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));
jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));
jest.mock('../../services/api/deleteSubscriptionApi');
jest.mock('../../hooks/refreshToken');
jest.spyOn(Alert, 'alert');

describe('handleCancelSubscription', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls API and clears local storage on success', async () => {
        AsyncStorage.getItem.mockResolvedValue('fakeToken');
        jwtDecode.mockReturnValue({ sub: 'user@example.com' });
        deleteSubscriptionApi.mockResolvedValue();
        refreshToken.mockResolvedValue();

        const callback = jest.fn();

        await handleCancelSubscription(callback);

        expect(jwtDecode).toHaveBeenCalledWith('fakeToken');
        expect(deleteSubscriptionApi).toHaveBeenCalledWith('user@example.com');
        expect(refreshToken).toHaveBeenCalled();
        expect(Alert.alert).toHaveBeenCalledWith(
            'Subscription Cancelled',
            'Your subscription has been successfully cancelled.'
        );
        expect(callback).toHaveBeenCalled();
    });

    it('shows error if token is missing', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);
        jwtDecode.mockReturnValue({}); // just to be safe

        await handleCancelSubscription();

        expect(Alert.alert).toHaveBeenCalledWith(
            'Error',
            expect.stringContaining('User email not found')
        );
    });

    it('shows error if user email is missing in token', async () => {
        AsyncStorage.getItem.mockResolvedValue('fakeToken');
        jwtDecode.mockReturnValue({}); // no sub

        await handleCancelSubscription();

        expect(Alert.alert).toHaveBeenCalledWith(
            'Error',
            expect.stringContaining('User email not found')
        );
    });

    it('shows error if deleteSubscriptionApi throws', async () => {
        AsyncStorage.getItem.mockResolvedValue('fakeToken');
        jwtDecode.mockReturnValue({ sub: 'user@example.com' });
        deleteSubscriptionApi.mockRejectedValue(new Error('API failed'));

        await handleCancelSubscription();

        expect(Alert.alert).toHaveBeenCalledWith('Error', 'API failed');
    });

    it('does not call callback if not provided', async () => {
        AsyncStorage.getItem.mockResolvedValue('fakeToken');
        jwtDecode.mockReturnValue({ sub: 'user@example.com' });
        deleteSubscriptionApi.mockResolvedValue();
        refreshToken.mockResolvedValue();

        await handleCancelSubscription(); // no callback

        expect(Alert.alert).toHaveBeenCalledWith(
            'Subscription Cancelled',
            'Your subscription has been successfully cancelled.'
        );
    });
});
