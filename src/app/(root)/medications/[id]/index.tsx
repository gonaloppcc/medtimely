import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../hooks/useNavOptions';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { ProgressIndicator } from '../../../../components/ProgressIndicator';
import { useMedication } from '../../../../hooks/useMedication';
import { MedicationIcon } from '../../../../components/MedicationIcon';
import { useAppTheme } from '../../../../theme';
import { RecordCards } from '../../../../components/RecordCards';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../model/routes';
import { useRecordsByMedication } from '../../../../hooks/useRecordsByMedication';

export default function MedicationScreen() {
    const medicationID = useLocalSearchParams()!.id as string; // TODO: !. is not safe since it can be null?
    const theme = useAppTheme();
    const { user } = useAuthentication();
    const uid = user?.uid ?? '';

    const { isSuccess, isLoading, isError, medication } =
        useMedication(medicationID);

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            onPress={() =>
                router.push({
                    pathname: ROUTE.MEDICATIONS.EDIT,
                    params: { id: medicationID },
                })
            }
        />
    );

    useNavOptions({
        headerTitle: isSuccess ? medication!.name : 'Medication not found',
        headerRight,
    });

    const {
        isSuccess: isSuccessRecords,
        isLoading: isLoadingRecords,
        isError: isErrorRecords,
        records,
        refetch: refetchRecords,
    } = useRecordsByMedication(uid, medicationID);

    const onPressRecord = (id: string) => {
        console.log(id);
        //TODO: Add modal like the homepage
    };

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && medication && (
                <>
                    <View style={styles.iconContainer}>
                        <MedicationIcon
                            form={medication.form}
                            size={140}
                            color={theme.colors.brandContainer}
                        />
                        <Text variant="headlineLarge">{medication.name}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge">Programs</Text>
                        <Text variant="labelMedium">
                            {medication.form.toLocaleLowerCase()} every day
                        </Text>
                        <Text variant="labelMedium">{medication.dosage} </Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge">Stock</Text>
                        {/* Add ownedMedication info */}
                    </View>

                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge">History</Text>

                        <Text variant="headlineSmall">Today</Text>
                        {isLoadingRecords && <ProgressIndicator />}
                        {isErrorRecords && (
                            <Text variant="headlineMedium">Error</Text>
                        )}
                        {isSuccessRecords && (
                            <RecordCards
                                isRefreshing={isLoading}
                                onRefresh={refetchRecords}
                                records={records}
                                onPressRecord={onPressRecord}
                            />
                        )}
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
