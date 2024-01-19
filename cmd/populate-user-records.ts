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

const RECORDS: MedicationRecord[] = [
    {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: true,
        scheduledTime: START_DATE,
    },
    {
        name: 'Paracetamol',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Loratadine',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Cetirizine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Ibuprofen',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Aspirin',
        dosage: '100mg',
        form: MedicationRecordForm.FOAM,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Benadryl',
        dosage: '100mg',
        form: MedicationRecordForm.PASTE,
        units: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Ifresh',
        dosage: '100mg',
        form: MedicationRecordForm.DROPS,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-25T23:50:00'),
    },
    {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: true,
        scheduledTime: new Date('2023-12-26T08:00:00'),
    },
    {
        name: 'Paracetamol',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T12:00:00'),
    },
    {
        name: 'Diphenhydramine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T22:00:00'),
    },
    {
        name: 'Benadryl',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T23:45:00'),
    },
    {
        name: 'Ifresh',
        dosage: '100mg',
        form: MedicationRecordForm.DROPS,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T23:50:00'),
    },
    {
        name: 'Diazepam',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-27T12:00:00'),
    },
    {
        name: 'Ibuprofen',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2023-12-28T12:00:00'),
    },
    {
        name: 'Paracetamol',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        units: 3,
        missed: true,
        scheduledTime: new Date('2023-12-30T08:00:00'),
    },
    {
        name: 'Levothyroxine',
        dosage: '50mcg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2024-01-02T08:30:00'),
    },
    {
        name: 'Buscopan',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2024-01-02T12:00:00'),
    },
    {
        name: 'Iron',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        units: 1,
        missed: false,
        scheduledTime: new Date('2024-01-02T12:00:00'),
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
