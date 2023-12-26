// noinspection SpellCheckingInspection

import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../model/MedicationRecord';

const STALL_TIME = 4000;

const MEDICATION_RECORDS_BY_DATE = {
    '2023-12-25': [
        {
            name: 'Fluoxetine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Paracetamol',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Loratadine',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Cetirizine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Diphenhydramine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ibuprofen',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Aspirin',
            dosage: '100mg',
            form: MedicationRecordForm.FOAM,
            amount: 1,
            missed: false,
        },
        {
            name: 'Benadryl',
            dosage: '100mg',
            form: MedicationRecordForm.PASTE,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ifresh',
            dosage: '100mg',
            form: MedicationRecordForm.DROPS,
            amount: 1,
            missed: false,
        },
    ],
    '2023-12-26': [
        {
            name: 'Fluoxetine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Paracetamol',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Loratadine',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Cetirizine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Diphenhydramine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ibuprofen',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Aspirin',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Benadryl',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ifresh',
            dosage: '100mg',
            form: MedicationRecordForm.DROPS,
            amount: 1,
            missed: false,
        },
    ],
    '2023-12-27': [
        {
            name: 'Cocaine',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Diazepam',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ecstasy',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Fentanyl',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
    ],
    '2023-12-28': [
        {
            name: 'Heroin',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Ibuprofen',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Jenkem',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ketamine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
    ],
    '2023-12-29': [
        {
            name: 'LSD',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Meth',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Nutmeg',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Opium',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
    ],
    '2023-12-30': [
        {
            name: 'Paracetamol',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Quaaludes',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ritalin',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Speed',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
    ],
    '2023-12-31': [
        {
            name: 'Tramadol',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'U-47700',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Valium',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Weed',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
    ],
    '2023-01-01': [
        {
            name: 'Xanax',
            dosage: '400mg',
            form: MedicationRecordForm.TABLET,
            amount: 3,
            missed: true,
        },
        {
            name: 'Yaba',
            dosage: '500mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Zolpidem',
            dosage: '10mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Adderall',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Bath Salts',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Cannabis',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Dextromethorphan',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Ephedrine',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
        },
        {
            name: 'Fentanyl',
            dosage: '100mg',
            form: MedicationRecordForm.TABLET,
            amount: 1,
            missed: false,
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
};
export const getRecord = async (
    token: string,
    id: string
): Promise<MedicationRecord> => {
    console.log(`Fetching record with id=${id} for token=${token}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(RECORD);
        }, 1000);
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
            resolve('Created');
        }, STALL_TIME);
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
        }, 1000);
    });
};
