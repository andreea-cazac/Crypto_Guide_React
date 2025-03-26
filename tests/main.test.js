import React from 'react';
import { render } from '@testing-library/react-native';
import MainScreen from '../app/main';

describe('MainScreen', () => {
    it('renders "Main Screen" text', () => {
        const { getByText } = render(<MainScreen />);
        expect(getByText('Main Screen')).toBeTruthy();
    });
});