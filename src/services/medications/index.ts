import { Medication } from '../../model/medication';
import { MedicationRecordForm } from '../../model/MedicationRecord';

const MEDICATIONS: Medication[] = [
    {
        name: 'Paracetamol',
        amount: 1,
        dosage: '500mg',
        form: MedicationRecordForm.TABLET,
        time: '12:00',
    },
    {
        name: 'Vitamin C',
        amount: 2,
        dosage: '100mg',
        form: MedicationRecordForm.INJECTION,
        time: '13:00',
    },
    {
        name: 'Brufen',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.LIQUID,
        time: '17:00',
    },
    {
        name: 'Cough Syrup',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.CAPSULE,
        time: '17:00',
    },
    {
        name: 'Dextromethorphan',
        amount: 3,
        dosage: '200mg',
        form: MedicationRecordForm.TABLET,
        time: '08:00',
    },
    {
        name: 'Erythromycin',
        amount: 23,
        dosage: '600mg',
        form: MedicationRecordForm.INJECTION,
        time: '12:00',
    },
    {
        name: 'Folic Acid',
        amount: 4,
        dosage: '500mg',
        form: MedicationRecordForm.LIQUID,
        time: '17:00',
    },
    {
        name: 'Guaifenesin',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.CAPSULE,
        time: '17:00',
    },
    {
        name: 'Hydrocodone',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.TABLET,
        time: '08:00',
    },
    {
        name: 'Ibuprofen',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.INJECTION,
        time: '12:00',
    },
    {
        name: 'Loratadine',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.LIQUID,
        time: '17:00',
    },
    {
        name: 'Metformin',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.CAPSULE,
        time: '17:00',
    },
    {
        name: 'Naproxen',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.TABLET,
        time: '08:00',
    },
    {
        name: 'Omeprazole',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.INJECTION,
        time: '12:00',
    },
    {
        name: 'Pantoprazole',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.LIQUID,
        time: '17:00',
    },
    {
        name: 'Quetiapine',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.CAPSULE,
        time: '17:00',
    },
    {
        name: 'Ranitidine',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.TABLET,
        time: '08:00',
    },
    {
        name: 'Sertraline',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.INJECTION,
        time: '12:00',
    },
    {
        name: 'Tramadol',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.LIQUID,
        time: '17:00',
    },
    {
        name: 'Vitamin B12',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.CAPSULE,
        time: '17:00',
    },
    {
        name: 'Vitamin D',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.TABLET,
        time: '08:00',
    },
    {
        name: 'Warfarin',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.INJECTION,
        time: '12:00',
    },
    {
        name: 'Xanax',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.LIQUID,
        time: '17:00',
    },
    {
        name: 'Zolpidem',
        amount: 1,
        dosage: '50mg',
        form: MedicationRecordForm.CAPSULE,
        time: '17:00',
    },
];

export const getMedications = async (token: string): Promise<Medication[]> => {
    console.log(`getting medications with token ${token}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MEDICATIONS);
        }, 1000);
    });
};

export const getMedication = async (
    userId: string,
    id: string
): Promise<Medication> => {
    console.log(`Fetching medication with id=${id} for user with id=${userId}`);

    //TODO: change this
    const ID = 1;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MEDICATIONS[ID]);
        }, 1000);
    });
};
