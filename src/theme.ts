import {
    adaptNavigationTheme,
    MD3DarkTheme,
    MD3LightTheme,
    useTheme,
} from 'react-native-paper';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import deepmerge from 'ts-deepmerge';

export const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const themeFonts = {
    fonts: {
        fontFamily: 'system',
    },
};

export const customThemeColors = {
    light: {
        colors: {
            main: 'rgb(0, 0, 0)',
            brand: 'rgb(187, 21, 34)',
            onBrand: 'rgb(255, 255, 255)',
            brandContainer: 'rgb(255, 218, 215)',
            onBrandContainer: 'rgb(65, 0, 4)',
            inverseBrand: 'rgb(255, 179, 174)',
            mainContrast: 'rgb(255, 255, 255)',
            error: 'rgb(255, 0, 0)',
        },
    },
    dark: {
        colors: {
            main: 'rgb(255, 255, 255)',
            brand: 'rgb(255, 179, 174)',
            onBrand: 'rgb(104, 0, 11)',
            brandContainer: 'rgb(147, 0, 20)',
            onBrandContainer: 'rgb(255, 218, 215)',
            inverseBrand: 'rgb(187, 21, 34)',
            mainContrast: 'rgb(0, 0, 0)',
            error: 'rgb(255, 0, 0)',
        },
    },
};

export const CombinedDefaultTheme = deepmerge(
    MD3LightTheme,
    LightTheme,
    customThemeColors.light
);
export const CombinedDarkTheme = deepmerge(
    MD3DarkTheme,
    DarkTheme,
    customThemeColors.dark
);
export type AppTheme = typeof CombinedDefaultTheme;
export const useAppTheme = () => useTheme<AppTheme>();
