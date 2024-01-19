import * as React from 'react';
import { useState } from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MedicationRecordForm } from '../../../model/medicationRecord';
import { MedicationFormFilterButtons } from '../../../components/MedicationFormFilterButtons';
import { useMedications } from '../../../hooks/useMedications';
import { MedicationCards } from '../../../components/MedicationCards';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { router } from 'expo-router';
import { ROUTE } from '../../../model/routes';
import { db } from '../../../firebase';

export default function MedicationsScreen() {
    const [selectForm, setSelectForm] = useState<MedicationRecordForm | ''>('');

    const { isSuccess, isLoading, isError, medications } = useMedications(db); // TODO: Replace with user's token

    const medicationForms = Array.from(
        new Set(medications.map((value) => value.form))
    );

    const medicationsFiltered =
        selectForm === ''
            ? medications
            : medications.filter((med) => med.form === selectForm);

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
                <MedicationCards
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
