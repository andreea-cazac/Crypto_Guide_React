import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfigureNewsApiScreen from '../../app/configure-news-api';
import { useApiConfig } from '../../hooks/useApiConfig';

jest.mock('../../hooks/useApiConfig');
jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn() }),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn(),
    },
}));
jest.mock('../../utils/confirmApiSwitch', () => ({
    handleApiSelection: jest.fn((current, value, callback) => callback()),
}));

describe('ConfigureNewsApiScreen', () => {
    it('renders loading state correctly', () => {
        useApiConfig.mockReturnValue({
            config: {},
            updateConfig: jest.fn(),
            loading: true,
        });
        const { queryByText } = render(<ConfigureNewsApiScreen />);
        expect(queryByText('Choose News API Source')).toBeNull();
    });

    it('renders correctly when config.news is "external"', () => {
        useApiConfig.mockReturnValue({
            config: { news: 'external' },
            updateConfig: jest.fn(),
            loading: false,
        });
        const { getByText } = render(<ConfigureNewsApiScreen />);
        expect(getByText('Choose News API Source')).toBeTruthy();
        expect(getByText('External')).toBeTruthy();
        expect(getByText('Local')).toBeTruthy();
    });

    it('renders correctly when config.news is "local"', () => {
        useApiConfig.mockReturnValue({
            config: { news: 'local' },
            updateConfig: jest.fn(),
            loading: false,
        });
        const { getByText } = render(<ConfigureNewsApiScreen />);
        expect(getByText('Choose News API Source')).toBeTruthy();
        expect(getByText('External')).toBeTruthy();
        expect(getByText('Local')).toBeTruthy();
    });

    it('calls updateConfig with "external" when External button is pressed', () => {
        const updateConfig = jest.fn();
        useApiConfig.mockReturnValue({
            config: { news: 'local' },
            updateConfig,
            loading: false,
        });

        const { getByText } = render(<ConfigureNewsApiScreen />);
        fireEvent.press(getByText('External'));
        expect(updateConfig).toHaveBeenCalledWith({ news: 'external' });
    });

    it('calls updateConfig with "local" when Local button is pressed', () => {
        const updateConfig = jest.fn();
        useApiConfig.mockReturnValue({
            config: { news: 'external' },
            updateConfig,
            loading: false,
        });

        const { getByText } = render(<ConfigureNewsApiScreen />);
        fireEvent.press(getByText('Local'));
        expect(updateConfig).toHaveBeenCalledWith({ news: 'local' });
    });
});
