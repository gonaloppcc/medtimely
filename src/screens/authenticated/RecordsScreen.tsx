import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export function RecordsScreen() {
    return (
        <View style={styles.container}>
            <Text>Records Screen</Text>
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
