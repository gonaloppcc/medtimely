import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useRecord } from '../../../hooks/useRecord';
import { RecordCard } from '../../../components/RecordCard';
import { useUpdateRecord } from '../../../hooks/useUpdateRecord';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../../model/MedicationRecord';
import { useAuthentication } from '../../../hooks/useAuthentication';

export const EditRecordScreen = () => {
    const uid = useAuthentication()?.uid || '';
    const recordId = '1'; // TODO: Replace the id with the real one
    const { isLoading, isSuccess, record } = useRecord(recordId, uid);
    const { updateRecord } = useUpdateRecord(
        uid,
        recordId,
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
            amount: 100,
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            missed: false,
            scheduledTime: record?.scheduledTime || new Date(),
        };

        updateRecord(newRecord);
    };

    return (
        <View style={{ paddingTop: 20 }}>
            {isLoading && <ActivityIndicator />}

            {/* Replace this with a different record view */}
            {
                isSuccess && (
                    <RecordCard {...(record as MedicationRecord)}></RecordCard>
                ) /* Since isSuccess is true we can be sure that the record is not null */
            }

            {/* TODO: Add a form to edit the record */}

            <Button onPress={onPressHandler}>Click me!</Button>
        </View>
    );
};
