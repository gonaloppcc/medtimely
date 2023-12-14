import React from 'react';
import {SignUpScreen} from '../screens/SignUpScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {useAuthentication} from '../hooks/useAuthentication';
import {signOut} from '../services/auth';
// TODO: Configure tsconfig.json to allow absolute imports
import {Appbar} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    SignUp: undefined;
    Login: undefined;
}


const Stack = createStackNavigator<RootStackParamList>();

// Screens that don't require authentication
const NotLoggedInScreens = () => {
    return <>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Log in'}}/>
    </>;
};

// Screens that require authentication
const LoggedInScreens = () => {
    return <>
        <Stack.Screen name="Home" component={HomeScreen}/>
    </>;
};

const ProfileHeader = () => {
    const user = useAuthentication();
    if (user) {
        const onProfilePress = async () => {
            alert(user.email);
            await signOut();
        };

        return <Appbar.Action icon="account-circle" onPress={onProfilePress}/>;
    } else {
        return null;
    }
};

export {Stack, LoggedInScreens, NotLoggedInScreens, ProfileHeader};
