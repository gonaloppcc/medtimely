import { Medication } from '../../model/medication';
import { MedicationRecordForm } from '../../model/medicationRecord';
import { addDoc, collection, Firestore } from 'firebase/firestore';
import { ProjectError } from '../error';

const MEDICATIONS: Medication[] = [
    {
        id: '1',
        name: 'Brufenon',
        activeSubstance: 'Ibuprofen + Paracetamol',
        dosage: '200 mg + 500 mg',
        form: MedicationRecordForm.TABLET,
        administration: 'Oral use',
        isGeneric: true,
        presentations: [
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 20,
                },
                safetyFeatures: false,
            },
        ],
    },
    {
        id: '2',
        name: 'Vipidia',
        activeSubstance: 'alogliptin',
        form: MedicationRecordForm.TABLET,
        dosage: '12.5 mg',
        aimTitular: 'Takeda Pharma A/S',
        comercialization: true,
        isGeneric: false,
        administration: 'Oral use',
        presentations: [
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 14,
                    pvp: 9.97,
                    maxPrice: 10.44,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 28,
                    pvp: 19.84,
                    maxPrice: 19.84,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 56,
                    isNotMarketed: true,
                },
                safetyFeatures: true,
            },
        ],
    },
    {
        id: '3',
        name: 'Vipidia',
        activeSubstance: 'alogliptin',
        form: MedicationRecordForm.TABLET,
        dosage: '25 mg',
        aimTitular: 'Takeda Pharma A/S',
        comercialization: true,
        isGeneric: false,
        administration: 'Oral use',
        presentations: [
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 14,
                    pvp: 9.97,
                    maxPrice: 10.44,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 28,
                    pvp: 19.84,
                    maxPrice: 19.84,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 56,
                    isNotMarketed: true,
                },
                safetyFeatures: true,
            },
        ],
    },
];

const MEDICATIONS_COLLECTION_NAME = 'medications';

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
    medicationID: string
): Promise<Medication> => {
    console.log(
        `Fetching medication with id=${medicationID} for user with id=${userId}`
    );

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MEDICATIONS[medicationID]);
        }, 1000);
    });
};

export const createMedication = async (
    db: Firestore,
    medication: Medication
): Promise<string> => {
    console.log(`Creating medication with name=${medication.name}`);

    const medicationsCollection = collection(db, MEDICATIONS_COLLECTION_NAME);

    try {
        const docRef = await addDoc(medicationsCollection, medication);

        console.log(`Created medication with id=${docRef.id}`);

        return docRef.id;
    } catch (err) {
        console.error('Error creating document: ', err);
        throw new ProjectError(
            'CREATING_MEDICATION_ERROR',
            `Error creating document on path=${MEDICATIONS_COLLECTION_NAME} with data=${JSON.stringify(
                medication
            )}`
        );
    }
};
