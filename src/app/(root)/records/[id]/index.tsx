import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../hooks/useNavOptions';
import { useRecord } from '../../../../hooks/useRecord';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { ProgressIndicator } from '../../../../components/ProgressIndicator';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../model/routes';

export default function RecordScreen() {
    const id = (useLocalSearchParams().id as string) || '';

    const uid = useAuthentication().user?.uid || '';
    const { isSuccess, isLoading, isError, record } = useRecord(id, uid);

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            onPress={() =>
                router.push({ pathname: ROUTE.RECORDS.EDIT, params: { id } })
            }
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
