import * as React from 'react';
import { useState } from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { EmptyPlannedMedications } from '../../../../../../components/EmptyPlannedMedications';
import { MedicationFormFilterButtons } from '../../../../../../components/MedicationFormFilterButtons';
import { PlannedMedicationCards } from '../../../../../../components/PlannedMedicationCards';
import { ProgressIndicator } from '../../../../../../components/ProgressIndicator';
import { db } from '../../../../../../firebase';
import { usePlannedMedications } from '../../../../../../hooks/usePlannedMedication';
import { MedicationRecordForm } from '../../../../../../model/medicationRecord';
import { ROUTE } from '../../../../../../model/routes';

export default function GroupMemberMedicationsScreen() {
    const [selectForm, setSelectForm] = useState<MedicationRecordForm | ''>('');

    const localSearchParams = useLocalSearchParams();
    const uid = localSearchParams.memberId as string;

    const { isSuccess, isLoading, isError, medications } =
        usePlannedMedications(db, uid);

    const medicationForms = Array.from(
        new Set(medications.map((value) => value.ownedMedication.form))
    );

    const medicationsFiltered =
        selectForm === ''
            ? medications
            : medications.filter(
                  (med) => med.ownedMedication.form === selectForm
              );

    const onSelectFilter = (newValue: '' | MedicationRecordForm) => {
        if (selectForm !== newValue) {
            setSelectForm(newValue);
        } else {
            setSelectForm('');
        }
    };

    const onPressMedication = (id: string) => {
        router.push({ pathname: ROUTE.MEDICATIONS.BY_ID, params: { id } });
    };

    return (
        <View style={styles.container}>
            {medicationForms.length > 1 && (
                <MedicationFormFilterButtons
                    forms={medicationForms}
                    onValueChange={onSelectFilter}
                    value={selectForm}
                />
            )}
            {isError && (
                <Text variant="headlineMedium">Something went wrong</Text>
            )}
            {isLoading && <ProgressIndicator />}
            {isSuccess && (
                <PlannedMedicationCards
                    medications={medicationsFiltered}
                    onPressMedication={onPressMedication}
                />
            )}

            {isSuccess && medicationsFiltered.length == 0 && (
                <EmptyPlannedMedications />
            )}
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
