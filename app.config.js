// app.config.js
import { config as dotenvConfig } from 'dotenv';
import 'dotenv/config'; // (optional, if you want automatic loading)

const envFile = process.env.NODE_ENV || '.env.development'
dotenvConfig({ path: envFile, override: true });


export default ({ config }) => ({
    ...config,
    name: "CryptoGuideFront",
    slug: "CryptoGuideFront",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/crypto_guide_logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/icons/crypto_guide_logo.png",
            backgroundColor: "#ffffff",
        },
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/icons/crypto_guide_logo.png",
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/icons/crypto_guide_logo.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#ffffff",
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },

    extra: {
        environment: process.env.ENVIRONMENT,
        api_base_url: process.env.EXPO_PUBLIC_API_URL,
        payment_endpoint: process.env.EXPO_PUBLIC_PAYMENT_ENDPOINT,
        stripePriceId: process.env.EXPO_PUBLIC_STRIPE_PRICE_ID,
        stripePublicKey: process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY,
    },
});
