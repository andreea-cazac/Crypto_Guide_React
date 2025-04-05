import {Alert} from 'react-native';

export const handleApiSelection = (current, selected, onConfirm) => {
    if (current === selected) {
        Alert.alert('Notice', `This API is already set to "${selected.toUpperCase()}".`);
    } else {
        Alert.alert(
            'Confirm API Change',
            `Are you sure you want to switch to "${selected.toUpperCase()}" API?`,
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: onConfirm },
            ]
        );
    }
};
