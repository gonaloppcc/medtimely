import React from 'react';
import { SignUpScreen } from '../screens/SignUpScreen';
import { LoginScreen } from '../screens/LoginScreen';
import HomeScreen, { HomeNav } from '../screens/authenticated/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RecordScreen } from '../screens/authenticated/RecordScreen';
import { MedicationsScreen } from '../screens/authenticated/MedicationsScreen';
import { RecordsScreen } from '../screens/authenticated/RecordsScreen';
import { SettingsScreen } from '../screens/authenticated/SettingsScreen';

export type RootStackParamList = {
    // Unauthenticated screens
    SignUp: undefined;
    Login: undefined;

    // Authenticated screens
    Home: undefined;
    Medications: undefined;
    Records: undefined;
    Settings: undefined;

    Record: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// Screens that don't require authentication
const NotLoggedInScreens = () => {
    return (
        <>
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerTransparent: true }}
            />
        </>
    );
};

// Screens that require authentication
const LoggedInScreens = () => {
    return (
        <>
            <Stack.Screen name="Home" component={HomeNav} />
            <Stack.Screen name="Medications" component={MedicationsScreen} />
            <Stack.Screen name="Records" component={RecordsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />

            <Stack.Screen
                name="Record"
                component={RecordScreen}
                options={{ presentation: 'modal' }}
            />
        </>
    );
};

export { Stack, LoggedInScreens, NotLoggedInScreens };
