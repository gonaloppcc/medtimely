import * as React from 'react';

import { Button, Text } from 'react-native-paper';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { signOut } from '../services/auth';
import { router } from 'expo-router';
import { ROUTE } from '../model/routes';

export default function ProfileScreen() {
    const onPressHandlerLogOut = async () => {
        await signOut();
        router.replace('/');
    };

    const onPressHandlerSettings = async () => {
        router.push(ROUTE.SETTINGS.BASE_NAME);
    };

    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>

            <Button
                icon="cog"
                onPress={onPressHandlerSettings}
                mode="contained"
            >
                Settings
            </Button>

            <Button
                icon="logout"
                onPress={onPressHandlerLogOut}
                mode="contained"
            >
                Logout
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
