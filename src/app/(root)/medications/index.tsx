import * as React from 'react';
import { useState } from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MedicationRecordForm } from '../../../model/medicationRecord';
import { MedicationFormFilterButtons } from '../../../components/MedicationFormFilterButtons';
import { PlannedMedicationCards } from '../../../components/PlannedMedicationCards';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { router } from 'expo-router';
import { ROUTE } from '../../../model/routes';
import { usePlannedMedications } from '../../../hooks/usePlannedMedication';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { EmptyPlannedMedications } from '../../../components/EmptyPlannedMedications';

export default function MedicationsScreen() {
    const [selectForm, setSelectForm] = useState<MedicationRecordForm | ''>('');

    const { user } = useAuthentication();
    const uid = user?.uid ?? '';
    // const uid = '10wFfsLJ3KTCPsW8oTU42K5x3Xt1';

    const { isSuccess, isLoading, isError, medications } =
        usePlannedMedications(uid);

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

    const onPressMedication = (medicationId: string) => {
        router.push({
            pathname: ROUTE.MEDICATIONS.BY_ID,
            params: { id: medicationId },
        });
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
                <View style={styles.emptyPlannedMedicationsContainer}>
                    <EmptyPlannedMedications />
                </View>
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
    emptyPlannedMedicationsContainer: {
        marginTop: '50%',
    },
});
