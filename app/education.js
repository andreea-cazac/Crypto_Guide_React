// app/education.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AccountIcon from "../components/AccountIcon";
import BackArrow from "../components/BackArrow";
import EducationCategoryCard from "../components/EducationCategoryCard";
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

import glossaryIcon from '../assets/icons/glossary.png';
import exchangeIcon from '../assets/icons/exchange.png';

export default function EducationScreen() {
    const router = useRouter();

    return (
        <View testID="EducationScreen" style={styles.container}>
            <View style={styles.header}>
                <BackArrow />
                <AccountIcon />
            </View>

            <Text style={styles.title}>Education</Text>


            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <EducationCategoryCard title="Glossary" icon={glossaryIcon} onPress={() => router.push('/glossary')} />
                <EducationCategoryCard title="Exchange" icon={exchangeIcon} onPress={() => console.log('Exchange pressed')} />
                <EducationCategoryCard title="Other" icon={glossaryIcon} onPress={() => console.log('Glossary pressed')} />
                <EducationCategoryCard title="Other" icon={exchangeIcon} onPress={() => console.log('Exchange pressed')} />
                <EducationCategoryCard title="Other" icon={glossaryIcon} onPress={() => console.log('Glossary pressed')} />
                <EducationCategoryCard title="Other" icon={exchangeIcon} onPress={() => console.log('Exchange pressed')} />
            </ScrollView>

            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 5, // leave space for status bar
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 16,
        color: Colors.style.primary,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12, // use spacing between cards (React Native 0.71+ supports `gap`)
    }
});
