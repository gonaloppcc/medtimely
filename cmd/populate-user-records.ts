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

const RECORDS: PopulateMedicationRecords[] = [
    {
        medicationId: '09rSXLXqy0OwsDHC3Egc',
        units: 1,
        scheduledTime: START_DATE,
        isPlanned: true,
    },
    {
        medicationId: '0CsThHCMy7XhgIYx8xHc',
        units: 1,
        isTaken: true,
        scheduledTime: START_DATE,
        isPlanned: true,
    },
    {
        medicationId: '0F9ioSdBtzgTWhazX1x1',
        units: 1,
        isTaken: true,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0NCgZ8rwy5hYlofTcdti',
        units: 1,
        isTaken: true,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0Oki6PCG2TNtgBcy5ssk',
        units: 1,
        isTaken: true,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0TyK8G22TJtIaKjbTlno',
        units: 1,
        isTaken: true,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0YKlXbETmX2bwUkrsrOO',
        units: 1,
        isTaken: true,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
    {
        medicationId: '0cReGFUnV5jcj6S01jZE',
        units: 1,
        isTaken: true,
        isPlanned: false,
        scheduledTime: START_DATE,
    },
];

console.log(`Creating ${RECORDS.length} records for userId=${userId}`);

const populateRecords = async (
    startDate: Date,
    interval: number = INTERVAL
) => {
    const batch = writeBatch(db);

    await Promise.all(
        RECORDS.map(async (populateRecord, index) => {
            // @ts-expect-error I'm using a method I added to Date
            // Dynamically creating the scheduledTime
            populateRecord.scheduledTime = new Date(startDate).addHours(
                index * interval
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
};

const START_DATES: Date[] = [
    // @ts-expect-error I'm using a method I added to Date
    new Date().addHours(-96),
    // @ts-expect-error I'm using a method I added to Date
    new Date().addHours(-48),
];

(async () => {
    for (const startDate of START_DATES) {
        await populateRecords(startDate);
    }
})()
    .then(() => {
        console.log(`All done!`);
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
