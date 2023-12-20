import { MedicationRecord } from '../../model/MedicationRecord';

const STALL_TIME = 4000;

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
            const MEDICATION_RECORDS = [
                {
                    name: 'Fluoxetine',
                    dosage: '400mg',
                    form: 'Tablet',
                    amount: 3,
                    missed: true,
                },
                {
                    name: 'Paracetamol',
                    dosage: '500mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'Loratadine',
                    dosage: '10mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'Cetirizine',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'Cocaine',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'Heroin',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'Meth',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'LSD',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'MDMA',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
                {
                    name: 'Methadone',
                    dosage: '100mg',
                    form: 'Tablet',
                    amount: 1,
                    missed: false,
                },
            ];
            resolve(MEDICATION_RECORDS);
        }, STALL_TIME);
    });
};
