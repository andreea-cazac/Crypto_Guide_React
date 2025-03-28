// app.config.js
import { config as dotenvConfig } from 'dotenv';
import 'dotenv/config'; // (optional, if you want automatic loading)

const envFile = process.env.ENVFILE || '.env.development'
dotenvConfig({ path: envFile, override: true });


export default ({ config }) => ({
    ...config,
    name: "CryptoGuideFront",
    slug: "CryptoGuideFront",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/images/splash-icon.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#ffffff",
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    // Use your environment variables here.
    extra: {
        api_base_url: process.env.EXPO_PUBLIC_API_URL, // e.g., "http://192.168.178.90:8080"
        payment_endpoint: process.env.EXPO_PUBLIC_PAYMENT_ENDPOINT, // e.g., "http://192.168.178.90:8080/stripe/subscription"
        stripePriceId: process.env.EXPO_PUBLIC_STRIPE_PRICE_ID, // e.g., "price_1R1U1o4gHyUjWEHaEqEYcyHd"
        stripePublicKey: process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY, // e.g., "pk_test_51R1TfJ4gHyUjWEHad8KKs0w8q..."
    },
});
