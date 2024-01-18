import * as React from 'react';

import { Button, Icon, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../services/auth';
import { router } from 'expo-router';
import { ROUTE } from '../model/routes';

export default function ProfileScreen() {
    const COLOR = '#ffffff';
    const size = 15;

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

            <Button onPress={onPressHandlerSettings} mode="contained">
                <Icon size={size} source='cog' color={COLOR} />
                Settings
            </Button>

            <Button onPress={onPressHandlerLogOut} mode="contained">
                <Icon size={size} source='logout' color={COLOR} />
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
