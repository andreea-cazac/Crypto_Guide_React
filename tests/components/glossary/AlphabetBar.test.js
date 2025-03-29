import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import AlphabetBar from '../../../components/glossary/AlphabetBar';

describe('AlphabetBar', () => {
    it('renders all letters and handles presses', () => {
        const alphabet = ['A', 'B', 'C'];
        const onLetterPress = jest.fn();

        const { getByTestId } = render(<AlphabetBar alphabet={alphabet} onLetterPress={onLetterPress} />);

        fireEvent.press(getByTestId('letter-bar-B'));
        expect(onLetterPress).toHaveBeenCalledWith('B');
    });
});