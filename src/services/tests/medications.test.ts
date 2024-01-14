import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebaseConfig';
import { getFirestore, terminate } from 'firebase/firestore';
import { afterAll, expect, test } from '@jest/globals';
import { getMedicationsByNameSubstring } from '../medications';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

afterAll(async () => {
    await terminate(db);
    console.log('Database connection terminated');
});

test('queryMedicationsByNameSubstring: should return medications with name containing substring', async () => {
    const medications = await getMedicationsByNameSubstring(db, 'Ab');

    console.log(medications.map((medication) => medication.name));

    expect(medications.length).toBeGreaterThan(0);
});

test('queryMedicationsByNameSubstring: should return medications with name containing substring', async () => {
    const medications = await getMedicationsByNameSubstring(db, 'Aa');

    console.log(medications.map((medication) => medication.name));

    expect(medications.length).toBe(0);
});
