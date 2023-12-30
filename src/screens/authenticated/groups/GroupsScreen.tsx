import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { GroupCards } from '../../../components/GroupCards';

export function GroupsScreen() {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Your Groups</Text>
            <GroupCards/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingBottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
