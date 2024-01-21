import { afterAll, expect, test } from '@jest/globals';
import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord,
} from '../records';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../model/medicationRecord';
import { firebaseConfig } from '../../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, terminate } from 'firebase/firestore';

const USER_ID = 'test';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

afterAll(async () => {
    await terminate(db);
    console.log('Database connection terminated');
});

test('createRecord&getRecord: should create a record and retrieve it', async () => {
    const RECORD: MedicationRecord = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: true,
        scheduledTime: new Date(),
        ownedMedicationRef: '', // FIXME
        isPlanned: false,
    };

    const recordId = await createRecord(db, USER_ID, RECORD);

    const recordRetrieved = await getRecord(db, recordId, USER_ID);

    RECORD.id = recordId; // add the id to the record to compare

    expect(recordRetrieved).toEqual(RECORD);
});

test('deleteRecord: should delete a record', async () => {
    const RECORD: MedicationRecord = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: true,
        scheduledTime: new Date(),
        ownedMedicationRef: '', // FIXME
        isPlanned: true,
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

test('updateRecord: should update a record', async () => {
    const RECORD: MedicationRecord = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: true,
        scheduledTime: new Date(),
        ownedMedicationRef: '', // FIXME
        isPlanned: true,
    };

    const recordId = await createRecord(db, USER_ID, RECORD);

    const UPDATED_RECORD: MedicationRecord = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: false,
        scheduledTime: new Date(),
        ownedMedicationRef: '', // FIXME
        isPlanned: true,
    };

    await updateRecord(db, USER_ID, recordId, UPDATED_RECORD);

    const recordRetrieved = await getRecord(db, recordId, USER_ID);

    UPDATED_RECORD.id = recordId; // add the id to the record to compare

    expect(recordRetrieved).toEqual(UPDATED_RECORD);
});
