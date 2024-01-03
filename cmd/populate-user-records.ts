// noinspection SpellCheckingInspection

import { getFirestore, writeBatch } from 'firebase/firestore';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../src/model/MedicationRecord';
import { initializeApp } from 'firebase/app';
import { createRecord } from '../src/services/records';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.argv.length !== 3) {
    // 3 because the first argument is node, the second is the script name
    console.log('Usage: yarn cmd:createRecord <userId>');
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
        amount: 3,
        missed: true,
        scheduledTime: START_DATE,
    },
    {
        name: 'Paracetamol',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Loratadine',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Cetirizine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Diphenhydramine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Ibuprofen',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Aspirin',
        dosage: '100mg',
        form: MedicationRecordForm.FOAM,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Benadryl',
        dosage: '100mg',
        form: MedicationRecordForm.PASTE,
        amount: 1,
        missed: false,
        scheduledTime: START_DATE,
    },
    {
        name: 'Ifresh',
        dosage: '100mg',
        form: MedicationRecordForm.DROPS,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-25T23:50:00'),
    },
    {
        name: 'Fluoxetine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-26T08:00:00'),
    },
    {
        name: 'Paracetamol',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T12:00:00'),
    },
    {
        name: 'Loratadine',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T16:00:00'),
    },
    {
        name: 'Cetirizine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T20:00:00'),
    },
    {
        name: 'Diphenhydramine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T22:00:00'),
    },
    {
        name: 'Ibuprofen',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-26T23:00:00'),
    },
    {
        name: 'Aspirin',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T23:30:00'),
    },
    {
        name: 'Benadryl',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T23:45:00'),
    },
    {
        name: 'Ifresh',
        dosage: '100mg',
        form: MedicationRecordForm.DROPS,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-26T23:50:00'),
    },
    {
        name: 'Cocaine',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-27T08:00:00'),
    },
    {
        name: 'Diazepam',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-27T12:00:00'),
    },
    {
        name: 'Ecstasy',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-27T16:00:00'),
    },
    {
        name: 'Fentanyl',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-27T20:00:00'),
    },
    {
        name: 'Heroin',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-28T08:00:00'),
    },
    {
        name: 'Ibuprofen',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-28T12:00:00'),
    },
    {
        name: 'Jenkem',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-28T16:00:00'),
    },
    {
        name: 'Ketamine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-28T20:00:00'),
    },
    {
        name: 'LSD',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-29T08:00:00'),
    },
    {
        name: 'Meth',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-29T12:00:00'),
    },
    {
        name: 'Nutmeg',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-29T16:00:00'),
    },
    {
        name: 'Opium',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-29T20:00:00'),
    },
    {
        name: 'Paracetamol',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-30T08:00:00'),
    },
    {
        name: 'Quaaludes',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-30T12:00:00'),
    },
    {
        name: 'Ritalin',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-30T16:00:00'),
    },
    {
        name: 'Speed',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-30T20:00:00'),
    },
    {
        name: 'Tramadol',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-12-31T08:00:00'),
    },
    {
        name: 'U-47700',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-31T12:00:00'),
    },
    {
        name: 'Valium',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-31T16:00:00'),
    },
    {
        name: 'Weed',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-12-31T20:00:00'),
    },
    {
        name: 'Xanax',
        dosage: '400mg',
        form: MedicationRecordForm.TABLET,
        amount: 3,
        missed: true,
        scheduledTime: new Date('2023-01-01T08:00:00'),
    },
    {
        name: 'Yaba',
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-01-01T12:00:00'),
    },
    {
        name: 'Zolpidem',
        dosage: '10mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-01-01T16:00:00'),
    },
    {
        name: 'Adderall',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-01-01T20:00:00'),
    },
    {
        name: 'Bath Salts',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2023-01-01T22:00:00'),
    },
    {
        name: 'Cannabis',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2022-01-01T23:00:00'),
    },
    {
        name: 'Dextromethorphan',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2022-01-01T23:30:00'),
    },
    {
        name: 'Ephedrine',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2022-01-01T23:45:00'),
    },
    {
        name: 'Fentanyl',
        dosage: '100mg',
        form: MedicationRecordForm.TABLET,
        amount: 1,
        missed: false,
        scheduledTime: new Date('2022-01-01T23:50:00'),
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
