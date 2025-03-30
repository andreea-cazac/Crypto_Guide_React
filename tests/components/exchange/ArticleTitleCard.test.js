import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArticleTitleCard from '../../../components/exchange/ArticleTitleCard';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('ArticleTitleCard', () => {
    it('renders title and handles press', () => {
        const mockPush = jest.fn();
        useRouter.mockReturnValue({ push: mockPush });

        const { getByText } = render(
            <ArticleTitleCard title="Example Title" content="Hello content" index={0} />
        );

        const titleElement = getByText('Example Title');
        expect(titleElement).toBeTruthy();

        fireEvent.press(titleElement);
        expect(mockPush).toHaveBeenCalledWith({
            pathname: '/article',
            params: { title: 'Example Title', content: 'Hello content' },
        });
    });
});