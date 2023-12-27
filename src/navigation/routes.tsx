import React from 'react';
import { SignUpScreen } from '../screens/SignUpScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/authenticated/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RecordScreen } from '../screens/authenticated/records/RecordScreen';
import { MedicationsScreen } from '../screens/authenticated/MedicationsScreen';
import { RecordsScreen } from '../screens/authenticated/records/RecordsScreen';
import { SettingsScreen } from '../screens/authenticated/SettingsScreen';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { Icon } from 'react-native-paper';
import { EditRecordScreen } from '../screens/authenticated/records/EditRecordScreen';
import { ProfileHeader } from '../components/ProfileHeader';

export type RootStackParamList = {
    // Unauthenticated screens
    SignUp: undefined;
    Login: undefined;

    Base: undefined;

    // Authenticated screens
    Home: undefined;
    Medications: undefined;
    Records: undefined;
    Settings: undefined;

    Record: { id: string };
    EditRecord: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();

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

const HomeScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerRight: () => <ProfileHeader />,
                }}
            />
            <Stack.Screen name="Record" component={RecordScreen} />
            <Stack.Screen
                name="EditRecord"
                component={EditRecordScreen}
                options={{ headerTitle: 'Edit Medication Record' }}
            />
        </Stack.Navigator>
    );
};

const HomeNav = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home Screens"
            component={HomeScreens}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="home" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Medications"
            component={MedicationsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="pill" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Records"
            component={RecordsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="account-circle" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="cog" color={color} size={24} />
                ),
            }}
        />
    </Tab.Navigator>
);

// Screens that require authentication
const LoggedInScreens = () => {
    return (
        <>
            <Stack.Screen
                name="Base"
                component={HomeNav}
                options={{ headerShown: false }}
            />
        </>
    );
};

export { Stack, LoggedInScreens, NotLoggedInScreens };
