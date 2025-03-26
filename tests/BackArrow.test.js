import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BackArrow from '../components/BackArrow';

// Define the mock inside the factory so it's self-contained.
jest.mock('expo-router', () => {
    const backMock = jest.fn();
    return {
        useRouter: () => ({
            back: backMock,
        }),
        __esModule: true,
        backMock, // Export the mock so it can be used in tests.
    };
});

// Now require the exported backMock from expo-router.
const { backMock } = require('expo-router');

describe('BackArrow Component', () => {
    beforeEach(() => {
        backMock.mockClear();
    });

    it('should render correctly with label "Back"', () => {
        const { getByText } = render(<BackArrow />);
        expect(getByText('Back')).toBeTruthy();
    });

    it('should call router.back when pressed', () => {
        const { getByText } = render(<BackArrow />);
        fireEvent.press(getByText('Back'));
        expect(backMock).toHaveBeenCalled();
    });
});