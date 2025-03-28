import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import MessageBanner from '../components/MessageBanner'; // ✅ Import
import GlossaryCard from '../components/GlossaryCard';
import BackArrow from "../components/BackArrow";
import AccountIcon from "../components/AccountIcon";
import { getAllGlossaryTerms } from '../services/api/glossaryApi';
import { useAlphabetScroll } from '../hooks/useAlphabetScroll';
import NavigationBar from "../components/NavigationBar";

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

                // Sort alphabetically by term (case-insensitive)
                const sorted = data.sort((a, b) =>
                    a.term.toLowerCase().localeCompare(b.term.toLowerCase())
                );

                // Group by first letter
                const grouped = {};
                for (const item of sorted) {
                    const firstLetter = item.term[0].toUpperCase();
                    if (!grouped[firstLetter]) {
                        grouped[firstLetter] = [];
                    }
                    grouped[firstLetter].push(item);
                }

                setGroupedTerms(grouped);
                setAlphabet(Object.keys(grouped).sort());
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
                <View style={styles.letterBar}>
                    {alphabet.map((letter) => (
                        <TouchableOpacity key={letter} onPress={() => scrollToLetter(letter)}>
                            <Text testID={`letter-bar-${letter}`} style={styles.letter}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.title}>Glossary</Text>

            {errorMessage && (
                <MessageBanner
                    title={errorMessage.title}
                    message={errorMessage.message}
                    type={errorMessage.type}
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color={Colors.style.primary} />
            ) : (
                <ScrollView ref={scrollViewRef} contentContainerStyle={styles.cardsContainer}>
                    {Object.entries(groupedTerms).map(([letter, group]) => (
                        <View
                            key={letter}
                            ref={(ref) => (sectionRefs.current[letter] = ref)}
                        >
                            <Text testID={`group-header-${letter}`} style={styles.groupLetter}>{letter}</Text>
                            {group.map((item) => (
                                <GlossaryCard key={item.id} term={item.term} meaning={item.meaning} />
                            ))}
                        </View>
                    ))}
                </ScrollView>
            )}

            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 16,
        color: Colors.style.primary,
    },
    cardsContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 100,
    },
    groupLetter: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.style.primary,
        marginBottom: 12,
        marginTop: 24,
    },
    letterBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 25,
        gap: 4,
    },

    letter: {
        fontSize: 20,
        color: Colors.style.primary,
        marginHorizontal: 4,
    },
});