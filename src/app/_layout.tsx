import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { AuthenticationProvider } from '../providers/AuthProvider';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import deepmerge from 'ts-deepmerge';

import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
  themeFonts,
} from '../theme';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'Roboto Serif': require('../../assets/fonts/RobotoSerif.ttf'),
  });

  useCallback(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;
  const inUseTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  const theme = deepmerge(inUseTheme, themeFonts);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider value={theme}>
            <Slot />
          </ThemeProvider>
        </PaperProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}