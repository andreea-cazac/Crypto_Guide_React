import { Alert } from 'react-native';
import { handleApiSelection } from '../../utils/confirmApiSwitch'; // Adjust the path as needed

// Spy on Alert.alert
jest.spyOn(Alert, 'alert');

describe('handleApiSelection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows notice alert when current equals selected', () => {
        const current = 'A';
        const selected = 'A';
        const onConfirm = jest.fn();

        handleApiSelection(current, selected, onConfirm);

        expect(Alert.alert).toHaveBeenCalledWith(
            'Notice',
            'This API is already set to "A".'
        );
    });

    it('shows confirmation alert when current is different from selected', () => {
        const current = 'A';
        const selected = 'B';
        const onConfirm = jest.fn();

        handleApiSelection(current, selected, onConfirm);

        expect(Alert.alert).toHaveBeenCalledWith(
            'Confirm API Change',
            'Are you sure you want to switch to "B" API?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: onConfirm },
            ]
        );
    });

    it('triggers onConfirm callback when "Yes" is pressed', () => {
        const current = 'A';
        const selected = 'B';
        const onConfirm = jest.fn();

        handleApiSelection(current, selected, onConfirm);

        // Get the arguments passed to Alert.alert
        const alertArgs = Alert.alert.mock.calls[0];
        // alertArgs[2] is the array of buttons.
        const buttons = alertArgs[2];

        // Find the "Yes" button
        const yesButton = buttons.find((btn) => btn.text === 'Yes');

        // Simulate a press on the "Yes" button
        yesButton.onPress();

        expect(onConfirm).toHaveBeenCalled();
    });
});
