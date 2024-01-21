// noinspection SpellCheckingInspection

import { getFirestore, writeBatch } from 'firebase/firestore';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../src/model/medicationRecord';
import { initializeApp } from 'firebase/app';
import { createRecord } from '../src/services/records';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.argv.length !== 3) {
    // 3 because the first argument is node, the second is the script name
    console.log('Usage: yarn cmd:populate-user-records <userId>');
    process.exit(1);
}

const userId = process.argv[2];

// @ts-expect-error I'm adding a method to Date
Date.prototype.addHours = function (h: number) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

const INTERVAL = 4; // 4 hours
const START_DATE = new Date();

const getPathToPersonalMed = (uid: string, medId: string) => {
    return `users/${uid}/ownedMedications/${medId}`;
};

// TODO corrigir os ids
const RECORDS: MedicationRecord[] = [
    {
        name: 'Paracetamol + Caffeine',
        ownedMedicationRef: getPathToPersonalMed(
            userId,
            'U2DLymP1OcHmJVbzBb0A'
        ),
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: true,
        scheduledTime: START_DATE,
        isPlanned: true,
    },
    {
        name: 'Brufen',
        ownedMedicationRef: getPathToPersonalMed(
            userId,
            'Vq6SYbRIep0BxlYQkGIJ'
        ),
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
        isPlanned: true,
    },
];

console.log(`Creating ${RECORDS.length} records for userId=${userId}`);

(async () => {
    const batch = writeBatch(db);

    await Promise.all(
        RECORDS.map(async (record, index) => {
            // @ts-expect-error I'm using a method I added to Date
            // Dynamically creating the scheduledTime
            record.scheduledTime = new Date(START_DATE).addHours(
                index * INTERVAL
            );

            return await createRecord(db, userId, record).then((id) => {
                console.log(`Created record with id=${id}`);
            });
        })
    );

    await batch.commit();
})()
    .then(() => {
        console.log(`All done!`);
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
