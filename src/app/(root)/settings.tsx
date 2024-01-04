import * as React from 'react';

import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../../services/auth';
import { useAuthentication } from '../../hooks/useAuthentication';

export default function SettingsScreen() {
    const { user, isLoading } = useAuthentication();
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>

            <Button onPress={() => { signOut() }} mode='contained'>Logout</Button>
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
