import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MedicineCards } from '../../components/MedicineCards';
import { Medicine } from '../../model/Medicine';


const MEDICATION_DETAILED = {
    name: 'Paracetamol',
    amount: 1,
    dosage: '500mg',
    form: 'Tablet',
    time: '12:00',
};

export function MedicationsScreen() {
    //TODO: Change this
    const medicines: Medicine[] = [];
    for (let i = 0; i < 10; i++) {
        medicines.push(MEDICATION_DETAILED);
    }


    return (
        <View style={styles.container}>
            <Text>Medications Screen</Text>
            {/* TODO: Add search bar */}
            {/* TODO: Add filter by form */}

            <MedicineCards  medicines={medicines}/>
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
