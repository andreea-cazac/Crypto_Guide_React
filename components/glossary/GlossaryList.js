import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlossaryCard from './GlossaryCard';
import {GlobalStyle} from '../../constants/GlobalStyle';

export default function GlossaryList({ groupedTerms, sectionRefs }) {
    return (
        <>
            {Object.entries(groupedTerms).map(([letter, group]) => (
                <View key={letter} ref={(ref) => (sectionRefs.current[letter] = ref)}>
                    <Text testID={`group-header-${letter}`} style={styles.groupLetter}>{letter}</Text>
                    {group.map((item) => (
                        <GlossaryCard key={item.id} term={item.term} meaning={item.meaning} />
                    ))}
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    groupLetter: {
        fontSize: 32,
        fontWeight: 'bold',
        color: GlobalStyle.colors.primary,
        marginBottom: 12,
        marginTop: 24,
    },
});