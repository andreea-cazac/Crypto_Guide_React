import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../../components/Header';

describe('Header component', () => {
    it('renders both BackArrow and AccountIcon when both props are true', () => {
        const { getByTestId } = render(<Header showBack={true} showAccount={true} />);
        expect(getByTestId('back-arrow')).toBeTruthy();
        expect(getByTestId('account-btn')).toBeTruthy();
    });

    it('renders only BackArrow when showAccount is false', () => {
        const { getByTestId, queryByTestId } = render(<Header showBack={true} showAccount={false} />);
        expect(getByTestId('back-arrow')).toBeTruthy();
        expect(queryByTestId('account-btn')).toBeNull();
    });

    it('renders only AccountIcon when showBack is false', () => {
        const { getByTestId, queryByTestId } = render(<Header showBack={false} showAccount={true} />);
        expect(queryByTestId('back-arrow')).toBeNull();
        expect(getByTestId('account-btn')).toBeTruthy();
    });

    it('renders placeholders when both props are false', () => {
        const { queryByTestId } = render(<Header showBack={false} showAccount={false} />);
        expect(queryByTestId('back-arrow')).toBeNull();
        expect(queryByTestId('account-btn')).toBeNull();
    });

    it('renders with default props (showBack and showAccount are true)', () => {
        const { getByTestId } = render(<Header />);
        expect(getByTestId('back-arrow')).toBeTruthy();
        expect(getByTestId('account-btn')).toBeTruthy();
    });

});