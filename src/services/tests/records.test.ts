import { afterAll, expect, test } from '@jest/globals';
import { createRecord, deleteRecord, getRecord } from '../records';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../model/MedicationRecord';
import { firebaseConfig } from '../../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, terminate } from 'firebase/firestore';

const TIMEOUT = 1000;
const USER_ID = 'test';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

test(
    'createRecord&getRecord: should create a record and retrieve it',
    async () => {
        const RECORD: MedicationRecord = {
            name: 'Fluoxetine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            scheduledTime: new Date(),
        };

        const recordId = await createRecord(db, USER_ID, RECORD);

        const recordRetrieved = await getRecord(db, recordId, USER_ID);

        RECORD.id = recordId; // add the id to the record to compare

        expect(recordRetrieved).toEqual(RECORD);
    },
    TIMEOUT
);

test('deleteRecord: should delete a record', async () => {
    const RECORD: MedicationRecord = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date(),
    };

    const recordId = await createRecord(db, USER_ID, RECORD);

    await deleteRecord(db, USER_ID, recordId);

    let recordRetrieved: MedicationRecord | undefined;
    try {
        recordRetrieved = await getRecord(db, recordId, USER_ID);
    } catch (err) {
        expect(recordRetrieved).toBeUndefined();
    }
});

afterAll(async () => {
    await terminate(db);
    console.log('Database connection terminated');
});
