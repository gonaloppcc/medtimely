import React, {useCallback} from 'react';
import {PaperProvider} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import {useColorScheme} from 'react-native';

import {useFonts} from 'expo-font';

import {NavigationContainer,} from '@react-navigation/native';
import {AuthenticationProvider} from './src/providers/AuthProvider';
import {CombinedDarkTheme, CombinedDefaultTheme, themeFonts} from './src/theme';
import deepmerge from 'ts-deepmerge';
import {AppLayout} from './src/components/AppLayout';

SplashScreen.preventAutoHideAsync();

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
                    <AppLayout/>
                </NavigationContainer>
            </PaperProvider>
        </AuthenticationProvider>
    );
}
