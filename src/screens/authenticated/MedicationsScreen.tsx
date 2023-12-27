import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MedicineCards } from '../../components/MedicineCards';
import { Medicine } from '../../model/Medicine';
import { MedicationRecordForm } from '../../model/MedicationRecord';
import { FilterByForm } from '../../components/FilterByForm';

const MEDICATION_DETAILED_1 = {
    name: 'Paracetamol',
    amount: 1,
    dosage: '500mg',
    form: MedicationRecordForm.TABLET,
    time: '12:00',
};

const MEDICATION_DETAILED_2 = {
    name: 'Vitamin C',
    amount: 2,
    dosage: '100mg',
    form: MedicationRecordForm.INJECTION,
    time: '13:00',
};

const MEDICATION_DETAILED_3 = {
    name: 'Antibiotic',
    amount: 1,
    dosage: '50mg',
    form: MedicationRecordForm.LIQUID,
    time: '17:00',
};

export function MedicationsScreen() {
    const [selectForm, setSelectForm] = React.useState<
        MedicationRecordForm | ''
    >('');
    const [medSelected, setMedSelected] = React.useState<Medicine[]>([]);

    //TODO: Change this
    const medicines: Medicine[] = [];
    for (let i = 0; i < 5; i++) {
        medicines.push(MEDICATION_DETAILED_1);
        medicines.push(MEDICATION_DETAILED_2);
        medicines.push(MEDICATION_DETAILED_3);
    }

    React.useEffect(() => {
        if (selectForm !== '') {
            setMedSelected(medicines.filter((med) => med.form === selectForm));
        } else {
            setMedSelected(medicines);
        }
    }, [selectForm]);

    const medForms = Array.from(new Set(medicines.map((value) => value.form)));

    const onSelecFilter = (newValue) => {
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
                onValueChange={onSelecFilter}
                value={selectForm}
            />
            <MedicineCards medicines={medSelected} />
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
