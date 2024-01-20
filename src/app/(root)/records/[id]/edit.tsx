import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useRecord } from '../../../../hooks/useRecord';
import { RecordCard } from '../../../../components/RecordCard';
import { useUpdateRecord } from '../../../../hooks/useUpdateRecord';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../../../model/medicationRecord';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { useLocalSearchParams } from 'expo-router';

export default function EditRecordScreen() {
    const id = (useLocalSearchParams().id as string) || '';
    const uid = useAuthentication().user?.uid || '';
    const { isLoading, isSuccess, record } = useRecord(id, uid);
    const { updateRecord } = useUpdateRecord(
        uid,
        id,
        () => {
            console.log('updated');
        },
        () => {
            console.log('error');
        }
    );

    const onPressHandler = () => {
        const newRecord: MedicationRecord = {
            name: record?.name == 'Paracetamol' ? 'Ibuprofen' : 'Paracetamol',
            units: 100,
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            missed: false,
            scheduledTime: record?.scheduledTime || new Date(),
            ownedMedicationRef: '', // TODO
        };

        updateRecord(newRecord);
    };

    return (
        <View style={{ paddingTop: 20 }}>
            {isLoading && <ActivityIndicator />}

            {/* Replace this with a different record view */}
            {
                isSuccess && (
                    <RecordCard
                        {...(record as MedicationRecord)}
                        onPress={() => {}}
                    ></RecordCard>
                ) /* Since isSuccess is true we can be sure that the record is not null */
            }

            {/* TODO: Add a form to edit the record */}

            <Button onPress={onPressHandler}>Click me!</Button>
        </View>
    );
}
