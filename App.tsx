import {StatusBar} from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import {Appbar, MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme, useTheme} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import {useColorScheme} from 'react-native';
import auth from '@firebase/auth';

import {useFonts} from 'expo-font';

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import deepmerge from 'ts-deepmerge';
import {useCallback} from 'react';
import {AuthenticationProvider} from './src/providers/AuthProvider';
import {useAuthentication} from './src/hooks/useAuthentication';
import {WelcomeScreen, LogInScreen} from './src/screens/StartScreen';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
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

const customThemeColors = {
    light: {
        "colors": {
            "brand": "rgb(187, 21, 34)",
            "onBrand": "rgb(255, 255, 255)",
            "brandContainer": "rgb(255, 218, 215)",
            "onBrandContainer": "rgb(65, 0, 4)",
            "inverseBrand": "rgb(255, 179, 174)",
        }
    },
    dark: {
        "colors": {
            "brand": "rgb(255, 179, 174)",
            "onBrand": "rgb(104, 0, 11)",
            "brandContainer": "rgb(147, 0, 20)",
            "onBrandContainer": "rgb(255, 218, 215)",
            "inverseBrand": "rgb(187, 21, 34)",
        }
    }
}

const CombinedDefaultTheme = deepmerge(MD3LightTheme, LightTheme, customThemeColors.light);
const CombinedDarkTheme = deepmerge(MD3DarkTheme, DarkTheme, customThemeColors.dark);

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

type RootStackParamList = {
    home: undefined;
    welcome: undefined;
    login: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }

    namespace ReactNativePaper {
        interface ThemeColors {
            brand: string;
            onBrand: string;
            BrandContainer: string;
            onBrandContainer: string;
            inverseBrand: string;
        }
    }
}

const MainApp = () => {
    const theme = useTheme();
    const user = useAuthentication();
    return <>
        <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'}/>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerRight: (props) => {
                const user = useAuthentication();
                if (user) {
                    return <Appbar.Action icon="account-circle" onPress={() => {
                        alert(user.email);
                        auth().signOut();
                    }}/>
                } else {
                    return null
                }
            },
        }}>
            {user ?
                <>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                </> :
                <>
                    <Stack.Screen name='welcome' component={WelcomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name='login' component={LogInScreen} options={{title: "Log in"}}/>
                </>}
        </Stack.Navigator>
    </>
}

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
        <AuthenticationProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer onReady={onLayoutRootView} theme={theme}>
                    <MainApp/>
                </NavigationContainer>
            </PaperProvider>
        </AuthenticationProvider>
    );
}
