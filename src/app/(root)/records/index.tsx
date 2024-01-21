import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useNavOptions } from '../../../hooks/useNavOptions';
import { ROUTE } from '../../../model/routes';

export default function RecordsScreen() {
    const headerRight = () => (
        <Appbar.Action
            icon="plus"
            onPress={() =>
                router.push({
                    pathname: ROUTE.RECORDS.ADD,
                })
            }
        />
    );

    useNavOptions({
        headerRight,
    });

    return (
        <View style={styles.container}>
            <Text>Records Screen</Text>
            {/* <Link asChild href={ROUTE.RECORDS.ADD}>
                <FAB icon="plus" style={styles.fab} />
            </Link> */}
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
