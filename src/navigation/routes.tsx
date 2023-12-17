import React from 'react';
import {SignUpScreen} from '../screens/SignUpScreen';
import {LoginScreen} from '../screens/LoginScreen';
import HomeScreen from '../screens/authenticated/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {RecordScreen} from '../screens/authenticated/RecordScreen';

export type RootStackParamList = {
    Home: undefined;
    SignUp: undefined;
    Login: undefined;
    Record: { id: string };
}


const Stack = createStackNavigator<RootStackParamList>();

// Screens that don't require authentication
const NotLoggedInScreens = () => {
    return <>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerTransparent: true}}/>
    </>;
};

// Screens that require authentication
const LoggedInScreens = () => {
    return <>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Record" component={RecordScreen}/>
    </>;
};

export {Stack, LoggedInScreens, NotLoggedInScreens};
