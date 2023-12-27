// noinspection SpellCheckingInspection

import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../model/MedicationRecord';

const SMALL_STALL_TIME = 1000;
const STALL_TIME = 4000;

type MedicationRecordsByDate = {
    [D in string]: MedicationRecord[];
};

const MEDICATION_RECORDS_BY_DATE: MedicationRecordsByDate = {
    '2023-12-25': [
        {
            name: 'Fluoxetine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-25T08:00:00'),
        },
        {
            name: 'Paracetamol',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T12:00:00'),
        },
        {
            name: 'Loratadine',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T16:00:00'),
        },
        {
            name: 'Cetirizine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T20:00:00'),
        },
        {
            name: 'Diphenhydramine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T22:00:00'),
        },
        {
            name: 'Ibuprofen',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T23:00:00'),
        },
        {
            name: 'Aspirin',
            dosage: '100mg',
            form: MedicationRecordForm.FOAM,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T23:30:00'),
        },
        {
            name: 'Benadryl',
            dosage: '100mg',
            form: MedicationRecordForm.PASTE,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T23:45:00'),
        },
        {
            name: 'Ifresh',
            dosage: '100mg',
            form: MedicationRecordForm.DROPS,
            amount: 1,
            missed: false,
            time: new Date('2023-12-25T23:50:00'),
        },
    ],
    '2023-12-26': [
        {
            name: 'Fluoxetine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-26T08:00:00'),
        },
        {
            name: 'Paracetamol',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T12:00:00'),
        },
        {
            name: 'Loratadine',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T16:00:00'),
        },
        {
            name: 'Cetirizine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T20:00:00'),
        },
        {
            name: 'Diphenhydramine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T22:00:00'),
        },
        {
            name: 'Ibuprofen',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-26T23:00:00'),
        },
        {
            name: 'Aspirin',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T23:30:00'),
        },
        {
            name: 'Benadryl',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T23:45:00'),
        },
        {
            name: 'Ifresh',
            dosage: '100mg',
            form: MedicationRecordForm.DROPS,
            amount: 1,
            missed: false,
            time: new Date('2023-12-26T23:50:00'),
        },
    ],
    '2023-12-27': [
        {
            name: 'Cocaine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-27T08:00:00'),
        },
        {
            name: 'Diazepam',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-27T12:00:00'),
        },
        {
            name: 'Ecstasy',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-27T16:00:00'),
        },
        {
            name: 'Fentanyl',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-27T20:00:00'),
        },
    ],
    '2023-12-28': [
        {
            name: 'Heroin',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-28T08:00:00'),
        },
        {
            name: 'Ibuprofen',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-28T12:00:00'),
        },
        {
            name: 'Jenkem',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-28T16:00:00'),
        },
        {
            name: 'Ketamine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-28T20:00:00'),
        },
    ],
    '2023-12-29': [
        {
            name: 'LSD',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-29T08:00:00'),
        },
        {
            name: 'Meth',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-29T12:00:00'),
        },
        {
            name: 'Nutmeg',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-29T16:00:00'),
        },
        {
            name: 'Opium',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-29T20:00:00'),
        },
    ],
    '2023-12-30': [
        {
            name: 'Paracetamol',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-30T08:00:00'),
        },
        {
            name: 'Quaaludes',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-30T12:00:00'),
        },
        {
            name: 'Ritalin',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-30T16:00:00'),
        },
        {
            name: 'Speed',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-30T20:00:00'),
        },
    ],
    '2023-12-31': [
        {
            name: 'Tramadol',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-12-31T08:00:00'),
        },
        {
            name: 'U-47700',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-31T12:00:00'),
        },
        {
            name: 'Valium',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-31T16:00:00'),
        },
        {
            name: 'Weed',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-12-31T20:00:00'),
        },
    ],
    '2023-01-01': [
        {
            name: 'Xanax',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
            time: new Date('2023-01-01T08:00:00'),
        },
        {
            name: 'Yaba',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-01-01T12:00:00'),
        },
        {
            name: 'Zolpidem',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-01-01T16:00:00'),
        },
        {
            name: 'Adderall',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-01-01T20:00:00'),
        },
        {
            name: 'Bath Salts',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2023-01-01T22:00:00'),
        },
        {
            name: 'Cannabis',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2022-01-01T23:00:00'),
        },
        {
            name: 'Dextromethorphan',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2022-01-01T23:30:00'),
        },
        {
            name: 'Ephedrine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2022-01-01T23:45:00'),
        },
        {
            name: 'Fentanyl',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
            time: new Date('2022-01-01T23:50:00'),
        },
    ],
};

export const getRecords = async (
    token: string,
    date: Date
): Promise<MedicationRecord[]> => {
    console.log(
        `Fetching records in date=${date.toDateString()} for token=${token}`
    );
    // TODO: This is just for now, it should be replaced with data from the database
    return new Promise((resolve) => {
        setTimeout(() => {
            const dateString = date.toISOString().split('T')[0];
            const MEDICATION_RECORDS = MEDICATION_RECORDS_BY_DATE[dateString];

            // If there are no records for the date, return an empty array
            if (!MEDICATION_RECORDS) {
                resolve([]);
                return;
            }

            resolve(MEDICATION_RECORDS);
        }, STALL_TIME);
    });
};

const RECORD: MedicationRecord = {
    name: 'Fluoxetine',
    dosage: '400mg',
    form: MedicationRecordForm.TABLET,
    amount: 3,
    missed: true,
    time: new Date(),
};
export const getRecord = async (
    token: string,
    id: string
): Promise<MedicationRecord> => {
    console.log(`Fetching record with id=${id} for token=${token}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(RECORD);
        }, SMALL_STALL_TIME);
    });
};

export const createRecord = async (
    token: string,
    record: MedicationRecord
): Promise<string> => {
    console.log(`Creating record=${record} for token=${token}`);

    // TODO: Implement this

    return new Promise((resolve) => {
        setTimeout(() => {
            // Create mock record creation here
            const day = record.time.toISOString().split('T')[0];
            MEDICATION_RECORDS_BY_DATE[day].push(record);

            resolve('CreatedID'); // TODO: Replace with actual ID
        }, SMALL_STALL_TIME);
    });
};

export const updateRecord = async (
    token: string,
    record: MedicationRecord
): Promise<MedicationRecord> => {
    console.log(`Updating record=${record} for token=${token}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            RECORD.name = record.name;
            RECORD.dosage = record.dosage;
            RECORD.form = record.form;
            RECORD.amount = record.amount;
            RECORD.missed = record.missed;

            resolve(RECORD);
        }, SMALL_STALL_TIME);
    });
};
