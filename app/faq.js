import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import {GlobalStyle} from '../constants/GlobalStyle';
import {faqItems} from '../utils/faqData';
import NavigationBar from "../components/NavigationBar";

export default function FAQScreen() {
    return (
        <View style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.titleWrapper}>
            <Text style={GlobalStyle.components.title}>FAQ</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {faqItems.map((item, index) => (
                    <View style={styles.faqItem} key={index}>
                        <Text style={styles.question}>{item.question}</Text>
                        <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                ))}
            </ScrollView>
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
        padding: 20,
    },
    faqItem: {
        marginBottom: 24,
    },
    titleWrapper: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    answer: {
        fontSize: 14,
        color: GlobalStyle.colors.subtleText,
    },
});
