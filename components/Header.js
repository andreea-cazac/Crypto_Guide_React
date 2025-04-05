import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackArrow from './BackArrow';
import AccountIcon from './AccountIcon';

export default function Header({ showBack = true, showAccount = true }) {
    return (
        <View style={styles.header}>
            {showBack ? <BackArrow style={styles.backArrow} /> : <View style={styles.placeholder} />}
            {showAccount ? <AccountIcon style={styles.accountIcon} /> : <View style={styles.placeholder} />}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    backArrow: {
        marginLeft: 0,
    },
    accountIcon: {
        marginRight: 0,
    },
    placeholder: {
        width: 50,
    },
});