import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { useFonts } from 'expo-font';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import deepmerge from 'ts-deepmerge';
import { useCallback } from 'react';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const themeFonts = {
  fonts: {
    headlineLarge: {
      fontFamily: 'Roboto Serif',
    },
    headlineMedium: {
      fontFamily: 'Roboto Serif',
    },
    headlineSmall: {
      fontFamily: 'Roboto Serif',
    }
  }
}

const CombinedDefaultTheme = deepmerge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = deepmerge(MD3DarkTheme, DarkTheme);

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto Serif': require('./assets/fonts/RobotoSerif.ttf'),
  })

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
    <PaperProvider theme={theme}>
      <NavigationContainer onReady={onLayoutRootView} theme={theme}>
        <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'} />
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
