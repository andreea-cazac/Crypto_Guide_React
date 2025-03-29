import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../constants/GlobalStyle';
import AlphabetBar from '../components/glossary/AlphabetBar';
import GlossaryList from '../components/glossary/GlossaryList';
import MessageBanner from '../components/MessageBanner';
import BackArrow from '../components/BackArrow';
import AccountIcon from '../components/AccountIcon';
import NavigationBar from '../components/NavigationBar';
import {getAllGlossaryTerms} from '../services/api/glossaryApi';
import {useAlphabetScroll} from '../hooks/useAlphabetScroll';
import {groupGlossaryTerms} from '../utils/groupGlossaryTerms';

export default function GlossaryScreen() {
    const [groupedTerms, setGroupedTerms] = useState({});
    const [alphabet, setAlphabet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const { scrollViewRef, sectionRefs, scrollToLetter } = useAlphabetScroll();

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await getAllGlossaryTerms();
                const { grouped, alphabet } = groupGlossaryTerms(data);
                setGroupedTerms(grouped);
                setAlphabet(alphabet);
            } catch (error) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the glossary. Please check your connection or try again later.',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackArrow />
                <AccountIcon />
            </View>

            {alphabet.length > 0 && (
                <AlphabetBar alphabet={alphabet} onLetterPress={scrollToLetter} />
            )}

            <Text style={GlobalStyle.components.title}>Glossary</Text>

            {errorMessage && (
                <MessageBanner
                    title={errorMessage.title}
                    message={errorMessage.message}
                    type={errorMessage.type}
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color={GlobalStyle.colors.primary} />
            ) : (
                <ScrollView ref={scrollViewRef} contentContainerStyle={styles.cardsContainer}>
                    <GlossaryList groupedTerms={groupedTerms} sectionRefs={sectionRefs} />
                </ScrollView>
            )}

            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
        paddingHorizontal: 16,
        paddingTop: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 100,
    },
    cardsContainer: {
        paddingBottom: 20,
    },
});