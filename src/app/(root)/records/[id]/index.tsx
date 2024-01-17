import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../hooks/useNavOptions';
import { useRecord } from '../../../../hooks/useRecord';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { ProgressIndicator } from '../../../../components/ProgressIndicator';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../model/routes';
import { MedicationIcon } from '../../../../components/MedicationIcon';
import { useAppTheme } from '../../../../theme';
import { formateDateToString } from '../../../../services/date';

export default function RecordScreen() {
    const id = (useLocalSearchParams().id as string) || '';
    const uid = useAuthentication().user?.uid || '';
    const theme = useAppTheme();
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
        headerTitle: isLoading
            ? 'Record is loading'
            : isSuccess
              ? record!.name
              : 'Record not found',
        headerRight,
    });

    const MissedTakenTitle =
        record?.missed !== null
            ? record?.missed
                ? 'Missed medication'
                : 'Medication Taken'
            : 'Missed medication';

    const dataRecord = record ? formateDateToString(record.scheduledTime) : '';

    const MissedTakenBody =
        record?.missed !== null
            ? record?.missed
                ? `${record.units} unit(s) was not taken on ${dataRecord}`
                : `${record?.units} unit(s) were taken on ${dataRecord}`
            : `${record?.units} unit(s) will be taken on ${dataRecord}`;

    // const backgroundColorMissedTaken =
    //     record && record.missed
    //         ? theme.colors.errorContainer
    //         : theme.colors.onSurface;

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && record && (
                <>
                    <View style={styles.iconContainer}>
                        <MedicationIcon
                            form={record.form}
                            size={140}
                            color={theme.colors.brandContainer}
                        />
                        <Text variant="headlineLarge">{record.name}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text variant="headlineSmall">{MissedTakenTitle}:</Text>
                        <Text variant="labelMedium">{MissedTakenBody}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text variant="headlineSmall">Information:</Text>
                        <Text variant="labelMedium">
                            {record.form.toLocaleLowerCase()}, {record.dosage}
                        </Text>
                    </View>
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
    iconContainer: {
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 32,
    },
    textContainer: {
        display: 'flex',
        gap: 8,
    },
});
