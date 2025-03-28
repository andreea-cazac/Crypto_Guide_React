import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationBar from '../../components/NavigationBar';

// Define the mock within the factory function
jest.mock('expo-router', () => {
    const mockPush = jest.fn();
    return {
        useRouter: () => ({
            push: mockPush,
        }),
        __esModule: true,
        // Export the mock for test access
        mockPush,
    };
});

// Retrieve the exported mock from the module
const { mockPush } = require('expo-router');

describe('NavigationBar Component', () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it('should navigate to /education when the first icon is pressed', () => {
        const { getAllByRole } = render(<NavigationBar />);
        const buttons = getAllByRole('button');

        fireEvent.press(buttons[0]);
        expect(mockPush).toHaveBeenCalledWith('/education');
    });

    it('should navigate to /main when the second icon is pressed', () => {
        const { getAllByRole } = render(<NavigationBar />);
        const buttons = getAllByRole('button');
        fireEvent.press(buttons[1]);
        expect(mockPush).toHaveBeenCalledWith('/main');
    });

    it('should navigate to /community when the third icon is pressed', () => {
        const { getAllByRole } = render(<NavigationBar />);
        const buttons = getAllByRole('button');
        fireEvent.press(buttons[2]);
        expect(mockPush).toHaveBeenCalledWith('/community');
    });
});