import * as React from 'react';

import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../../services/auth';

export default function SettingsScreen() {
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
