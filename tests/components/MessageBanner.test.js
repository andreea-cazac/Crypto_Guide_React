import React from 'react';
import { render } from '@testing-library/react-native';
import MessageBanner from '../../components/MessageBanner';

describe('MessageBanner Component', () => {
    const title = 'Test Title';
    const message = 'This is a test message.';

    it('renders correctly with title and message', () => {
        const { getByText, toJSON } = render(
            <MessageBanner title={title} message={message} />
        );
        // Verify both title and message are rendered.
        expect(getByText(title)).toBeTruthy();
        expect(getByText(message)).toBeTruthy();
        // Snapshot test for regression.
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders correctly without a title', () => {
        const { queryByText, getByText, toJSON } = render(
            <MessageBanner message={message} />
        );
        // Message should be there, title should not.
        expect(getByText(message)).toBeTruthy();
        expect(queryByText(title)).toBeNull();
        expect(toJSON()).toMatchSnapshot();
    });

    it('applies error styling when type is "error"', () => {
        const { toJSON } = render(
            <MessageBanner type="error" title={title} message={message} />
        );
        // The snapshot should reflect error styling (e.g., red background).
        expect(toJSON()).toMatchSnapshot();
    });

    it('applies success styling when type is "success"', () => {
        const { toJSON } = render(
            <MessageBanner type="success" title={title} message={message} />
        );
        // The snapshot should reflect success styling (e.g., green background).
        expect(toJSON()).toMatchSnapshot();
    });
});