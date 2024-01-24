import { afterAll, expect, test } from '@jest/globals';
import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord,
} from '../records';
import {
    MedicationRecordData,
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
    const RECORD: MedicationRecordData = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        isTaken: true,
        scheduledTime: new Date(),
        ownedMedicationRef: '',
        isPlanned: false,
    };

    const recordId = await createRecord(db, USER_ID, RECORD);

    const recordRetrieved = (await getRecord(
        db,
        recordId,
        USER_ID
    )) as MedicationRecordData;

    expect(recordRetrieved).toEqual(RECORD);
});

test('deleteRecord: should delete a record', async () => {
    const RECORD: MedicationRecordData = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        isTaken: true,
        scheduledTime: new Date(),
        ownedMedicationRef: '',
        isPlanned: true,
    };

    const recordId = await createRecord(db, USER_ID, RECORD);

    await deleteRecord(db, USER_ID, recordId);

    let recordRetrieved: MedicationRecordData | undefined;
    try {
        recordRetrieved = (await getRecord(
            db,
            recordId,
            USER_ID
        )) as MedicationRecordData;
    } catch (err) {
        expect(recordRetrieved).toBeUndefined();
    }
});

test('updateRecord: should update a record', async () => {
    const RECORD: MedicationRecordData = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        isTaken: true,
        scheduledTime: new Date(),
        ownedMedicationRef: '',
        isPlanned: true,
    };

    const recordId = await createRecord(db, USER_ID, RECORD);

    const UPDATED_RECORD: MedicationRecordData = {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        isTaken: false,
        scheduledTime: new Date(),
        ownedMedicationRef: '',
        isPlanned: true,
    };

    await updateRecord(db, USER_ID, recordId, UPDATED_RECORD);

    const recordRetrieved = await getRecord(db, recordId, USER_ID);

    expect(recordRetrieved).toEqual(UPDATED_RECORD);
});
