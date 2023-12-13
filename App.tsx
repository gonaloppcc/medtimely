import React, {useCallback} from 'react';

import {StatusBar} from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import {Appbar, PaperProvider, useTheme} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import {useColorScheme} from 'react-native';

import {useFonts} from 'expo-font';

import {NavigationContainer,} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthenticationProvider} from './src/providers/AuthProvider';
import {useAuthentication} from './src/hooks/useAuthentication';
import {SignUpScreen} from './src/screens/StartScreen';
import {signOut} from './src/services/auth';
import {CombinedDarkTheme, CombinedDefaultTheme, themeFonts} from './src/theme';
import deepmerge from 'ts-deepmerge';
import {LoginScreen} from './src/screens/LoginScreen';

SplashScreen.preventAutoHideAsync();

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

const MainApp = () => {
    const theme = useTheme();
    const user = useAuthentication();
    const isLoggedIn = !!user;

    const style = !theme.isV3 || theme.dark ? 'light' : 'dark';

    return <>
        <StatusBar style={style}/>
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{headerRight: ProfileHeader}}>
            {isLoggedIn ? LoggedInScreens() : NotLoggedInScreens()}
        </Stack.Navigator>
    </>;
};

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'Roboto Serif': require('./assets/fonts/RobotoSerif.ttf'),
    });

    const colorScheme = useColorScheme();

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError)
        return null;

    const inUseTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
    const theme = deepmerge(inUseTheme, themeFonts);

    return (
        <AuthenticationProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer onReady={onLayoutRootView} theme={theme}>
                    <MainApp/>
                </NavigationContainer>
            </PaperProvider>
        </AuthenticationProvider>
    );
}
