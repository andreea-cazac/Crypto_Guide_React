import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfigureCryptoApiScreen from '../../app/configure-crypto-api';
import { useApiConfig } from '../../hooks/useApiConfig';
import { GlobalStyle } from '../../constants/GlobalStyle'; // Import GlobalStyle for color comparison

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

describe('ConfigureCryptoApiScreen', () => {
    it('renders loading state correctly', () => {
        useApiConfig.mockReturnValue({
            config: {},
            updateConfig: jest.fn(),
            loading: true,
        });
        const { queryByText } = render(<ConfigureCryptoApiScreen />);
        // When loading is true, the main content should not be rendered.
        expect(queryByText('Choose Crypto Prices API Source')).toBeNull();
    });

    it('renders correctly when config.coins is "external"', () => {
        useApiConfig.mockReturnValue({
            config: { coins: 'external' },
            updateConfig: jest.fn(),
            loading: false,
        });
        const { getByText, getByTestId } = render(<ConfigureCryptoApiScreen />);
        // Check the main instruction text is rendered.
        expect(getByText('Choose Crypto Prices API Source')).toBeTruthy();
        // Both button texts should be present.
        expect(getByText('External')).toBeTruthy();
        expect(getByText('Local')).toBeTruthy();

        // Verify the "external" button is active (style check)
        expect(getByTestId('external-button')).toHaveStyle({ backgroundColor: GlobalStyle.colors.primary });  // Use GlobalStyle for correct value
        expect(getByTestId('local-button')).toHaveStyle({ backgroundColor: GlobalStyle.colors.subtleText });  // Use GlobalStyle for correct value
    });

    it('renders correctly when config.coins is "local"', () => {
        useApiConfig.mockReturnValue({
            config: { coins: 'local' },
            updateConfig: jest.fn(),
            loading: false,
        });
        const { getByText, getByTestId } = render(<ConfigureCryptoApiScreen />);
        expect(getByText('Choose Crypto Prices API Source')).toBeTruthy();
        expect(getByText('External')).toBeTruthy();
        expect(getByText('Local')).toBeTruthy();

        // Verify the "local" button is active (style check)
        expect(getByTestId('local-button')).toHaveStyle({ backgroundColor: GlobalStyle.colors.primary });  // Use GlobalStyle for correct value
        expect(getByTestId('external-button')).toHaveStyle({ backgroundColor: GlobalStyle.colors.subtleText });  // Use GlobalStyle for correct value
    });

    it('calls handlePress and updates the config when "external" is pressed', () => {
        const updateConfig = jest.fn();
        useApiConfig.mockReturnValue({
            config: { coins: 'local' },
            updateConfig,
            loading: false,
        });

        const { getByTestId } = render(<ConfigureCryptoApiScreen />);
        fireEvent.press(getByTestId('external-button'));

        // Ensure handlePress gets called with 'external'
        expect(updateConfig).toHaveBeenCalledWith({ coins: 'external' });
    });

    it('calls handlePress and updates the config when "local" is pressed', () => {
        const updateConfig = jest.fn();
        useApiConfig.mockReturnValue({
            config: { coins: 'external' },
            updateConfig,
            loading: false,
        });

        const { getByTestId } = render(<ConfigureCryptoApiScreen />);
        fireEvent.press(getByTestId('local-button'));

        // Ensure handlePress gets called with 'local'
        expect(updateConfig).toHaveBeenCalledWith({ coins: 'local' });
    });

    it('should show correct button style based on the selection', () => {
        const updateConfig = jest.fn();

        useApiConfig.mockReturnValue({
            config: { coins: 'local' },
            updateConfig,
            loading: false,
        });

        const { getByTestId } = render(<ConfigureCryptoApiScreen />);

        // Simulate press
        fireEvent.press(getByTestId('external-button'));

        // Simulate re-render with updated config
        useApiConfig.mockReturnValueOnce({
            config: { coins: 'external' },
            updateConfig,
            loading: false,
        });

        // Re-render to apply new config
        const { getByTestId: getByTestIdRerender } = render(<ConfigureCryptoApiScreen />);

        expect(getByTestIdRerender('external-button')).toHaveStyle({
            backgroundColor: GlobalStyle.colors.primary,
        });
        expect(getByTestIdRerender('local-button')).toHaveStyle({
            backgroundColor: GlobalStyle.colors.subtleText,
        });
    });

});
