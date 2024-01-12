import { Medication } from '../../model/medication';
import { MedicationRecordForm } from '../../model/medicationRecord';
import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
} from 'firebase/firestore';
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
        commercialisation: true,
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
        commercialisation: true,
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

export const getMedicationsByFilter = async (
    db: Firestore,
    name: string,
    activeSubstance: string,
    form: MedicationRecordForm,
    administration: string
): Promise<Medication[]> => {
    console.log(
        `getting medications filtered by name=${name}, activeSubstance=${activeSubstance}, form=${form}, administration=${administration}`
    );

    // TODO: Implement this

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MEDICATIONS);
        }, 1000);
    });
};

export const getMedication = async (
    db: Firestore,
    id: string
): Promise<Medication> => {
    console.log(`Fetching medication with id=${id}`);

    const docRef: DocumentReference = doc(db, MEDICATIONS_COLLECTION_NAME, id);

    let docSnap: DocumentSnapshot;

    try {
        docSnap = await getDoc(docRef);
    } catch (err) {
        console.error('Error getting document: ', err);
        throw new ProjectError(
            'GETTING_MEDICATION_ERROR',
            `Error getting document on path=${MEDICATIONS_COLLECTION_NAME}/${id}`
        );
    }

    if (docSnap.exists()) {
        return docSnap.data() as Medication;
    } else {
        throw new ProjectError(
            'INVALID_MEDICATION_ID_ERROR',
            `No medication with id=${id} exists`
        );
    }
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
