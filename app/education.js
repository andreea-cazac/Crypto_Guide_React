import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import EducationCategoryCard from "../components/education/EducationCategoryCard";
import {GlobalStyle} from '../constants/GlobalStyle';
import {useRouter} from 'expo-router';
import Header from '../components/Header';

import glossaryIcon from '../assets/icons/glossary.png';
import exchangeIcon from '../assets/icons/exchange.png';

export default function EducationScreen() {
    const router = useRouter();

    return (
        <View testID="EducationScreen" style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.content}>
                <Text style={GlobalStyle.components.title}>Education</Text>

                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <EducationCategoryCard title="Glossary" icon={glossaryIcon} onPress={() => router.push('/glossary')} />
                    <EducationCategoryCard title="Exchange" icon={exchangeIcon} onPress={() => router.push('/exchange')} />
                    <EducationCategoryCard title="Other" icon={glossaryIcon} onPress={() => console.log('Glossary pressed')} />
                    <EducationCategoryCard title="Other" icon={exchangeIcon} onPress={() => console.log('Exchange pressed')} />
                    <EducationCategoryCard title="Other" icon={glossaryIcon} onPress={() => console.log('Glossary pressed')} />
                    <EducationCategoryCard title="Other" icon={exchangeIcon} onPress={() => console.log('Exchange pressed')} />
                </ScrollView>
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
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
});
