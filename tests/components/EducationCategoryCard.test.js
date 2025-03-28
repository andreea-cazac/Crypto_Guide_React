import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EducationCategoryCard from '../../components/EducationCategoryCard'; // adjust if path differs

describe('EducationCategoryCard', () => {
    const mockTitle = 'Glossary';
    const mockIcon = require('../../assets/icons/glossary.png'); // mock image
    const mockOnPress = jest.fn();

    it('renders correctly with title and icon', () => {
        const { getByText, getByTestId  } = render(
            <EducationCategoryCard title={mockTitle} icon={mockIcon} onPress={mockOnPress} />
        );

        expect(getByText(mockTitle)).toBeTruthy();
        expect(getByTestId('education-icon')).toBeTruthy();
    });

    it('calls onPress when tapped', () => {
        const { getByRole } = render(
            <EducationCategoryCard title={mockTitle} icon={mockIcon} onPress={mockOnPress} />
        );

        fireEvent.press(getByRole('button'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});