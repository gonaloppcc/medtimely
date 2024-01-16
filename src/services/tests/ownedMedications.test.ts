import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebaseConfig';
import { getFirestore, terminate } from 'firebase/firestore';
import { afterAll, beforeAll, expect, test } from '@jest/globals';
import {
    createOwnedMedication,
    deleteOwnedMedication,
    getOwnedMedication,
    getUserOwnedMedications,
} from '../ownedMedication';
import { MedicationRecordForm } from '../../model/medicationRecord';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const uid = 'test';

afterAll(async () => {
    await terminate(db);
    console.log('Database connection terminated');
});

// Clearing all the owned medications from the user before the tests
beforeAll(async () => {
    const ownedMedications = await getUserOwnedMedications(db, uid);

    for (const ownedMedication of ownedMedications) {
        await deleteOwnedMedication(db, uid, ownedMedication.id);
    }
});

test('createOwnedMedication and getOwnedMedications: should create and get owned medication', async () => {
    const ownedMedications = await getUserOwnedMedications(db, uid);

    console.log(ownedMedications);

    expect(ownedMedications.length).toBe(0);

    const medicationId = '09rSXLXqy0OwsDHC3Egc';
    const medicationForm = MedicationRecordForm.TABLET;
    const stock = 10;

    const id = await createOwnedMedication(
        db,
        uid,
        medicationId,
        medicationForm,
        stock
    );

    console.log(id);

    expect(id).toBeDefined();

    const ownedMedicationsAfter = await getUserOwnedMedications(db, uid);

    console.log(ownedMedicationsAfter);

    expect(ownedMedicationsAfter.length).toBe(1);
});

test('deleteOwnedMedication: should delete owned medication', async () => {
    const ownedMedications = await getUserOwnedMedications(db, uid);

    console.log(ownedMedications);

    expect(ownedMedications.length).toBe(1);

    const ownedMedication = ownedMedications[0];

    await deleteOwnedMedication(db, uid, ownedMedication.id);

    const ownedMedicationsAfter = await getUserOwnedMedications(db, uid);

    console.log(ownedMedicationsAfter);

    expect(ownedMedicationsAfter.length).toBe(0);
});

test('getOwnedMedication: should get owned medication', async () => {
    const medicationId = '09rSXLXqy0OwsDHC3Egc';
    const medicationForm = MedicationRecordForm.TABLET;
    const stock = 10;

    const id = await createOwnedMedication(
        db,
        uid,
        medicationId,
        medicationForm,
        stock
    );

    console.log(id);

    expect(id).toBeDefined();

    const ownedMedication = await getOwnedMedication(db, uid, id);

    console.log(ownedMedication);

    expect(ownedMedication).toBeDefined();
});
