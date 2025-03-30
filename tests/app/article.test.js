import React from 'react';
import { render } from '@testing-library/react-native';
import * as hook from '../../hooks/useResolvedArticleContent';

jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
    useRouter: () => ({
        back: jest.fn(),
    }),
}));

// ✅ Properly mock ArticleContentCard with internal React scope
jest.mock('../../components/exchange/ArticleContentCard', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return () => <Text testID="mock-article-card">Mocked ArticleContentCard</Text>;
});

describe('ArticleScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders BackArrow and ArticleContentCard with resolved content', () => {
        // ✅ Mock the return value for useLocalSearchParams
        const { useLocalSearchParams } = require('expo-router');
        useLocalSearchParams.mockReturnValue({
            title: 'List of DEX Platforms',
            content: '',
        });

        // ✅ Mock custom hook
        jest.spyOn(hook, 'useResolvedArticleContent').mockReturnValue({
            resolvedContent: 'Mock content',
            tableData: [],
        });

        // ✅ Require after mocks are set
        const ArticleScreen = require('../../app/article').default;

        const { getByTestId } = render(<ArticleScreen />);
        expect(getByTestId('mock-article-card')).toBeTruthy();
    });
});