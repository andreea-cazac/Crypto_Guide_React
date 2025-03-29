import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewsFilter from '../../../components/feed/NewsFilter';

describe('NewsFilter', () => {
    it('renders and triggers filter change', () => {
        const onChangeFilter = jest.fn();

        const { getByText } = render(
            <NewsFilter selectedFilter="recent" onChangeFilter={onChangeFilter} />
        );

        fireEvent.press(getByText('Longest Read'));
        expect(onChangeFilter).toHaveBeenCalledWith('longest');
    });
});