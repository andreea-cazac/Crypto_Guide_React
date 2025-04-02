import React from 'react';
import {Redirect} from 'expo-router';
import Constants from "expo-constants";

export default function Index() {
    console.log("Running " + Constants.expoConfig?.extra.environment);
    return <Redirect href="/login" />;
}
