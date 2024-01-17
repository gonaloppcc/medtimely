import React, { useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { AuthenticationProvider } from '../providers/AuthProvider';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import deepmerge from 'ts-deepmerge';

import { CombinedDarkTheme, CombinedDefaultTheme, themeFonts } from '../theme';
import { PaperProvider } from 'react-native-paper';
import { useAuthentication } from '../hooks/useAuthentication';

// noinspection JSIgnoredPromiseFromCall
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [fontsLoaded, fontError] = useFonts({
        'Roboto Serif': require('../../assets/fonts/RobotoSerif.ttf'),
    });
    const authIsLoading = useAuthentication().isLoading;

    useCallback(() => {
        if ((fontsLoaded || fontError) && !authIsLoading) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError, authIsLoading]);

    if (!fontsLoaded && !fontError) return null;
    const inUseTheme =
        colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
    const theme = deepmerge(inUseTheme, themeFonts);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <PaperProvider theme={theme}>
                    <ThemeProvider value={theme}>
                        <Stack>
                            <Stack.Screen
                                name="(root)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="auth"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="settings"
                                options={{ headerTitle: 'Settings' }}
                            />
                        </Stack>
                    </ThemeProvider>
                </PaperProvider>
            </AuthenticationProvider>
        </QueryClientProvider>
    );
}
