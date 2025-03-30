import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../constants/GlobalStyle';
import AlphabetBar from '../components/glossary/AlphabetBar';
import GlossaryList from '../components/glossary/GlossaryList';
import MessageBanner from '../components/MessageBanner';
import NavigationBar from '../components/NavigationBar';
import {useAlphabetScroll} from '../hooks/useAlphabetScroll';
import {useGlossaryTerms} from '../hooks/useGlossaryTerms';
import Header from "../components/Header";

export default function GlossaryScreen() {
    const {
        groupedTerms,
        alphabet,
        loading,
        errorMessage
    } = useGlossaryTerms();

    const { scrollViewRef, sectionRefs, scrollToLetter } = useAlphabetScroll();

    return (
        <View style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.content}>
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
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.cardsContainer}
                    >
                        <GlossaryList groupedTerms={groupedTerms} sectionRefs={sectionRefs} />
                    </ScrollView>
                )}
            </View>

            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyle.colors.background,
    },
    content: {
        flex: 1, // 💡 This fills the remaining space above the nav bar
        paddingHorizontal: 16,
    },
    cardsContainer: {
        paddingBottom: 20,
    },
});