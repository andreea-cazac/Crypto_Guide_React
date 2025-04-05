import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import EducationCategoryCard from "../components/education/EducationCategoryCard";
import {GlobalStyle} from '../constants/GlobalStyle';
import {useRouter} from 'expo-router';
import Header from '../components/Header';
import {getAllCategories} from '../services/api/categoryApi';
import MessageBanner from '../components/MessageBanner';

export default function EducationScreen() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const iconMap = {
        exchange: require('../assets/icons/exchange.png'),
        wallets: require('../assets/icons/wallets.png'),
        risks: require('../assets/icons/risks.png'),
        basics: require('../assets/icons/basics.png'),
        markets: require('../assets/icons/markets.png'),
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                const filteredAndSorted = data
                    .filter(cat => Array.isArray(cat.articles) && cat.articles.length > 0)
                    .sort((a, b) => a.name.localeCompare(b.name));

                setCategories(filteredAndSorted);
            } catch (_error) {
                setErrorMessage({
                    title: 'Oops! Something went wrong',
                    message: 'We couldn’t load the articles for you. Please try again later.',
                    type: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const getIconByCategoryName = (name) => {
        const key = name.toLowerCase();
        return iconMap[key];
    };

    return (
        <View testID="EducationScreen" style={styles.container}>
            <Header showBack={true} showAccount={true} />

            <View style={styles.content}>
                <Text style={GlobalStyle.components.title}>Education</Text>
                {errorMessage && (
                    <MessageBanner
                        title={errorMessage.title}
                        message={errorMessage.message}
                        type={errorMessage.type}
                    />
                )}

                {loading ? (
                    <>
                    <ActivityIndicator size="large" color={GlobalStyle.colors.primary} />
                    </>
                ) : (
                    <ScrollView contentContainerStyle={styles.cardsContainer}>
                        {categories.map((category) => (
                            <EducationCategoryCard
                                key={category.id}
                                title={category.name}
                                icon={getIconByCategoryName(category.name)}
                                onPress={() => router.push({
                                    pathname: '/education/category',
                                    params: {
                                        title: category.name,
                                        articles: JSON.stringify(category.articles),
                                    },
                                })}
                            />
                        ))}

                        {/* Glossary card separated with spacing */}
                        <View style={styles.separator}>
                            <EducationCategoryCard
                                title="Glossary"
                                icon={require('../assets/icons/glossary.png')}
                                onPress={() => router.push('/glossary')}
                            />
                        </View>
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
    separator: {
        marginTop: 30,
    }
});
