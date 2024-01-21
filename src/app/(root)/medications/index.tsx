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
import { db } from '../../../firebase';
import { usePlannedMedications } from '../../../hooks/usePlannedMedication';
import { useAuthentication } from '../../../hooks/useAuthentication';

export default function MedicationsScreen() {
    const [selectForm, setSelectForm] = useState<MedicationRecordForm | ''>('');

    const { user } = useAuthentication();
    const uid = user?.uid ?? '';

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

    // TODO: Infinite list
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
