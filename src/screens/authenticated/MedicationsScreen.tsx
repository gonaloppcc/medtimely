import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Medicine } from '../../model/Medicine';
import { MedicationRecordForm } from '../../model/MedicationRecord';
import { FilterByForm } from '../../components/FilterByForm';
import { useMedications } from '../../hooks/useMedications';
import { MedicineCards } from '../../components/MedicineCards';
import { ProgressIndicator } from '../../components/ProgressIndicator';

export function MedicationsScreen() {
    const [selectForm, setSelectForm] = React.useState<
        MedicationRecordForm | ''
    >('');
    const [medSelected, setMedSelected] = React.useState<Medicine[]>([]);
    const { isSuccess, isLoading, isError, medications } = useMedications('1'); // TODO: Replace with user's token

    React.useEffect(() => {
        if (selectForm !== '') {
            setMedSelected(
                medications.filter((med) => med.form === selectForm)
            );
        } else {
            setMedSelected(medications);
        }
    }, [selectForm, isSuccess]);

    const medForms = Array.from(
        new Set(medications.map((value) => value.form))
    );

    const onSelectFilter = (newValue) => {
        if (selectForm !== newValue) {
            setSelectForm(newValue);
        } else {
            setSelectForm('');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Medications Screen</Text>
            <FilterByForm
                forms={medForms}
                onValueChange={onSelectFilter}
                value={selectForm}
            />
            {isError && (
                <Text variant="headlineMedium">Something went wrong</Text>
            )}
            {isLoading && <ProgressIndicator />}
            {isSuccess && (
                <>
                    <MedicineCards medicines={medSelected} />
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
