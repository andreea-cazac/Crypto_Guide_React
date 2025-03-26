import React from 'react';
import { render } from '@testing-library/react-native';
import CommunityScreen from '../app/community';

describe('CommunityScreen', () => {
    it('renders "Community Screen" text', () => {
        const { getByText } = render(<CommunityScreen />);
        expect(getByText('Community')).toBeTruthy();
    });
});