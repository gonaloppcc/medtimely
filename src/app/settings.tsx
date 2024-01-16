import * as React from 'react';

import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../services/auth';
import { router } from 'expo-router';

export default function SettingsScreen() {
    const onPressHandler = async () => {
        await signOut();
        router.replace('/');
    };
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>

            <Button onPress={onPressHandler} mode="contained">
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
