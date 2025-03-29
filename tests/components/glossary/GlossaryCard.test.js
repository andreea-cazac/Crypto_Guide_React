// __tests__/GlossaryCard.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import GlossaryCard from '../../../components/glossary/GlossaryCard';
import { GlobalStyle } from '../../../constants/GlobalStyle';

describe('GlossaryCard', () => {
    const mockTerm = 'Test Term';
    const mockMeaning = 'This is a test meaning for the term.';

    it('renders the term and meaning correctly', () => {
        const { getByText } = render(
            <GlossaryCard term={mockTerm} meaning={mockMeaning} />
        );

        // Verify that the term text is rendered.
        expect(getByText(mockTerm)).toBeTruthy();
        // Verify that the meaning text is rendered.
        expect(getByText(mockMeaning)).toBeTruthy();
    });

    it('matches the snapshot', () => {
        const tree = render(
            <GlossaryCard term={mockTerm} meaning={mockMeaning} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});