// noinspection SpellCheckingInspection

import { getFirestore, writeBatch } from 'firebase/firestore';
import { MedicationRecordWithoutMedication } from '../src/model/medicationRecord';
import { initializeApp } from 'firebase/app';
import { createRecordWithMedicationId } from '../src/services/records';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPathToPersonalMed = (uid: string, medId: string) => {
    return `users/${uid}/ownedMedications/${medId}`;
};

type PopulateMedicationRecords = MedicationRecordWithoutMedication & {
    medicationId: string;
};

// TODO corrigir os ids
const RECORDS: PopulateMedicationRecords[] = [
    {
        medicationId: '09rSXLXqy0OwsDHC3Egc', // FIXME: Should not be a constant id
        units: 1,
        missed: true,
        scheduledTime: START_DATE,
        isPlanned: true,
    },
    {
        medicationId: '0CsThHCMy7XhgIYx8xHc', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
        isPlanned: true,
    },
    {
        medicationId: '0F9ioSdBtzgTWhazX1x1', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0NCgZ8rwy5hYlofTcdti', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0Oki6PCG2TNtgBcy5ssk', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0TyK8G22TJtIaKjbTlno', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0YKlXbETmX2bwUkrsrOO', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0cReGFUnV5jcj6S01jZE', // FIXME: Should not be a constant id
        units: 1,
        missed: false,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
];

console.log(`Creating ${RECORDS.length} records for userId=${userId}`);

(async () => {
    const batch = writeBatch(db);

    await Promise.all(
        RECORDS.map(async (populateRecord, index) => {
            // @ts-expect-error I'm using a method I added to Date
            // Dynamically creating the scheduledTime
            populateRecord.scheduledTime = new Date(START_DATE).addHours(
                index * INTERVAL
            );

            return await createRecordWithMedicationId(
                db,
                userId,
                populateRecord,
                populateRecord.medicationId
            ).then((id) => {
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
