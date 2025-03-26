import React from 'react';
import { render } from '@testing-library/react-native';
import EducationScreen from '../app/education';

describe('EducationScreen', () => {
    it('renders "Education Screen" text', () => {
        const { getByText } = render(<EducationScreen />);
        expect(getByText('Education Screen')).toBeTruthy();
    });
});