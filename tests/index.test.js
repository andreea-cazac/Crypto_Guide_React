import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../app/index';

jest.mock('expo-router', () => {
    const React = require('react');
    const { Text } = require('react-native');
    const PropTypes = require('prop-types');

    const Redirect = (props) => React.createElement(Text, null, props.href);

    Redirect.propTypes = {
        href: PropTypes.string.isRequired,
    };

    return {
        Redirect,
        __esModule: true,
    };
});

describe('Index', () => {
    it('redirects to /main', () => {
        const { getByText } = render(<Index />);
        expect(getByText('/main')).toBeTruthy();
    });
});