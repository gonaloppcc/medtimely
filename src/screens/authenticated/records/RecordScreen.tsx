import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavOptions } from '../../../hooks/useNavOptions';
import { useRecord } from '../../../hooks/useRecord';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useRoute } from '../../../hooks/useRoute';
import { ProgressIndicator } from '../../../components/ProgressIndicator';

export function RecordScreen() {
    const nav = useNavigation();
    const route = useRoute();

    // @ts-ignore
    const recordId = route.params!.id as string;
    const uid = useAuthentication()?.uid || '';
    const { isSuccess, isLoading, isError, record } = useRecord(recordId, uid);

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            // @ts-expect-error TODO: Fix this if possible
            onPress={() => nav.navigate('EditRecord')}
        />
    );

    useNavOptions({
        headerTitle: isSuccess ? record!.name : 'Record not found',
        headerRight,
    });

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && (
                <>
                    <Text variant="headlineMedium">{record!.name}</Text>
                    <Text variant="labelMedium">{record!.dosage}</Text>
                    <Text variant="labelMedium">{record!.form}</Text>
                    <Text variant="labelMedium">{record!.amount}</Text>
                    <Text variant="labelMedium">
                        {record!.scheduledTime.toDateString()}
                    </Text>
                    <Text variant="labelMedium">
                        {record!.missed ? 'Missed' : 'Taken'}
                    </Text>
                </>
            )}
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
