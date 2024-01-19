import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../services/auth';
import { router } from 'expo-router';
import {
    DestructiveButton,
    GhostButton,
    OutlineButton,
    PrimaryButton,
    SecondaryButton,
} from '../components/Button';

export default function SettingsScreen() {
    const onPressHandler = async () => {
        await signOut();
        router.replace('/');
    };
    return (
        <View style={styles.container}>
            <PrimaryButton
                onPress={() => router.push({ pathname: '/groups/1/members/1' })}
            >
                Primary Button
            </PrimaryButton>

            {/* TODO: Erase the buttons below when the design is ready and applied */}
            <SecondaryButton
                onPress={() => router.push({ pathname: '/groups/1/members/1' })}
            >
                Secondary Button
            </SecondaryButton>

            <OutlineButton onPress={() => router.push({ pathname: '/groups' })}>
                Outline Button
            </OutlineButton>

            <GhostButton onPress={() => router.push({ pathname: '/groups' })}>
                Ghost Button
            </GhostButton>

            <DestructiveButton
                onPress={() => router.push({ pathname: '/groups/1/members/1' })}
            >
                Destructive Button
            </DestructiveButton>

            <DestructiveButton onPress={onPressHandler}>
                Logout
            </DestructiveButton>
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
