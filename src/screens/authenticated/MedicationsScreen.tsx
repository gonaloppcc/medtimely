import * as React from 'react';
import { useState } from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MedicationRecordForm } from '../../model/MedicationRecord';
import { MedicationFormFilterButtons } from '../../components/MedicationFormFilterButtons';
import { useMedications } from '../../hooks/useMedications';
import { MedicineCards } from '../../components/MedicineCards';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { useNav } from '../../hooks/useNav';
import { useNavOptions } from '../../hooks/useNavOptions';

export function MedicationsScreen() {
    const nav = useNav();
    const [selectForm, setSelectForm] = useState<MedicationRecordForm | ''>('');
    const { isSuccess, isLoading, isError, medications } = useMedications('1'); // TODO: Replace with user's token

    const medicationForms = Array.from(
        new Set(medications.map((value) => value.form))
    );

    const medicationsFiltered =
        selectForm === ''
            ? medications
            : medications.filter((med) => med.form === selectForm);

    useNavOptions({
        headerTitle: 'Medications',
    });

    const onSelectFilter = (newValue: '' | MedicationRecordForm) => {
        if (selectForm !== newValue) {
            setSelectForm(newValue);
        } else {
            setSelectForm('');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Medications Screen</Text>
            <MedicationFormFilterButtons
                forms={medicationForms}
                onValueChange={onSelectFilter}
                value={selectForm}
            />
            {isError && (
                <Text variant="headlineMedium">Something went wrong</Text>
            )}
            {isLoading && <ProgressIndicator />}
            {isSuccess && (
                <>
                    <MedicineCards medicines={medicationsFiltered} />
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
