import * as React from 'react';

import { FAB, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

export default function RecordsScreen() {
    return (
        <View style={styles.container}>
            <Text>Records Screen</Text>
            <Link asChild href="/(home)/records/new">
                <FAB icon="plus" style={styles.fab} />
            </Link>
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
