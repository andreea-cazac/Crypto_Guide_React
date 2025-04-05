import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { GlobalStyle } from '../../constants/GlobalStyle';

describe('CustomButton', () => {
    const label = 'Click Me';
    const onPressMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    const findTextNode = (tree) => {
        const contentView = tree.children?.[0];
        if (!contentView || !contentView.children) return null;
        return contentView.children.find(child => child.type === 'Text');
    };

    it('renders with default styles and calls onPress when pressed', () => {
        const { toJSON, getByText } = render(
            <CustomButton label={label} onPress={onPressMock} />
        );
        const tree = toJSON();
        const flattenedStyle = StyleSheet.flatten(tree.props.style);
        expect(flattenedStyle.minWidth).toBe(250);
        expect(flattenedStyle.paddingVertical).toBe(20);
        expect(flattenedStyle.borderRadius).toBe(40);
        expect(flattenedStyle.backgroundColor).toBe(GlobalStyle.colors.primary);

        fireEvent.press(getByText(label));
        expect(onPressMock).toHaveBeenCalled();
    });

    it('applies small styles when small prop is true', () => {
        const { toJSON } = render(
            <CustomButton label={label} onPress={onPressMock} small />
        );
        const tree = toJSON();
        const flattenedStyle = StyleSheet.flatten(tree.props.style);
        expect(flattenedStyle.minWidth).toBe(120);
        expect(flattenedStyle.paddingVertical).toBe(10);
        expect(flattenedStyle.borderRadius).toBe(20);
    });

    it('applies secondary styles when secondary prop is true', () => {
        const { toJSON } = render(
            <CustomButton label={label} onPress={onPressMock} secondary />
        );
        const tree = toJSON();
        const flattenedTouchableStyle = StyleSheet.flatten(tree.props.style);
        expect(flattenedTouchableStyle.backgroundColor).toBe(GlobalStyle.colors.secondary);

        const textNode = findTextNode(tree);
        expect(textNode).toBeTruthy();
        const flattenedTextStyle = StyleSheet.flatten(textNode.props.style);
        expect(flattenedTextStyle.color).toBe(GlobalStyle.colors.primary);
    });

    it('applies danger styles when danger prop is true', () => {
        const { toJSON } = render(
            <CustomButton label={label} onPress={onPressMock} danger />
        );
        const tree = toJSON();
        const flattenedTouchableStyle = StyleSheet.flatten(tree.props.style);
        expect(flattenedTouchableStyle.backgroundColor).toBe(GlobalStyle.colors.errorColor);

        const textNode = findTextNode(tree);
        expect(textNode).toBeTruthy();
        const flattenedTextStyle = StyleSheet.flatten(textNode.props.style);
        expect(flattenedTextStyle.color).toBe(GlobalStyle.colors.background);
    });

    it('prioritizes danger over secondary when both props are true', () => {
        const { toJSON } = render(
            <CustomButton label={label} onPress={onPressMock} secondary danger />
        );
        const tree = toJSON();
        const flattenedTouchableStyle = StyleSheet.flatten(tree.props.style);
        expect(flattenedTouchableStyle.backgroundColor).toBe(GlobalStyle.colors.errorColor);

        const textNode = findTextNode(tree);
        expect(textNode).toBeTruthy();
        const flattenedTextStyle = StyleSheet.flatten(textNode.props.style);
        expect(flattenedTextStyle.color).toBe(GlobalStyle.colors.background);
    });
});