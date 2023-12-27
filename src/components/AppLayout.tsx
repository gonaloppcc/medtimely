import { useTheme } from 'react-native-paper';
import { useAuthentication } from '../hooks/useAuthentication';
import { StatusBar } from 'expo-status-bar';
import {
    LoggedInScreens,
    NotLoggedInScreens,
    Stack,
} from '../navigation/routes';
import React from 'react';

export const AppLayout = () => {
    const theme = useTheme();
    const user = useAuthentication();
    const isLoggedIn = !!user;

    console.log('isLoggedIn: ', isLoggedIn);

    const style = !theme.isV3 || theme.dark ? 'light' : 'dark';

    return (
        <>
            <StatusBar style={style} />
            <Stack.Navigator initialRouteName="SignUp">
                {isLoggedIn ? LoggedInScreens() : NotLoggedInScreens()}
            </Stack.Navigator>
        </>
    );
};
