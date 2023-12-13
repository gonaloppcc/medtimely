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
import {LogInScreen, WelcomeScreen} from './src/screens/StartScreen';
import {signOut} from './src/services/auth';
import {CombinedDarkTheme, CombinedDefaultTheme, themeFonts} from './src/theme';
import deepmerge from 'ts-deepmerge';

SplashScreen.preventAutoHideAsync();

type RootStackParamList = {
    Home: undefined;
    Welcome: undefined;
    Login: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

const MainApp = () => {
    const theme = useTheme();
    const user = useAuthentication();
    return <>
        <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'}/>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerRight: () => {
                const user = useAuthentication();
                if (user) {
                    return <Appbar.Action icon="account-circle" onPress={async () => {
                        alert(user.email);
                        await signOut();
                    }}/>;
                } else {
                    return null;
                }
            },
        }}>
            {user ?
                <>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </> :
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={LogInScreen} options={{title: 'Log in'}}/>
                </>}
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
