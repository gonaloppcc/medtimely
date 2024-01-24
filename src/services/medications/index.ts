import { Medication, MedicationData } from '../../model/medication';
import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    limit,
    query,
    where,
} from 'firebase/firestore';
import { ProjectError } from '../error';

const MEDICATIONS_COLLECTION_NAME = 'medications';

export const getMedications = async (
    db: Firestore,
    maxDocuments: number = 5
): Promise<Medication[]> => {
    console.log(`getting medications`);

    return await getMedicationsByNameSubstring(db, '', maxDocuments);
};

export const getMedicationsByNameSubstring = async (
    db: Firestore,
    name: string,
    maxDocuments: number = 5
): Promise<Medication[]> => {
    console.log(
        `getting medications filtered by name=${name} with maxDocuments=${maxDocuments}`
    );

    const medicationsCollection = collection(db, MEDICATIONS_COLLECTION_NAME);

    const q = query(
        medicationsCollection,
        where('name', '>=', name),
        where('name', '<=', name + '\uf8ff'), // https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
        limit(maxDocuments)
    );

    try {
        const medications: Medication[] = [];

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const medication: Medication = doc.data() as Medication;

            medication.id = doc.id;

            medications.push(medication);
        });

        return medications;
    } catch (err) {
        console.error('Error performing firebase query: ', err);
        throw new ProjectError(
            'GETTING_MEDICATIONS_BY_NAME_SUBSTRING_ERROR',
            `Error getting document on path=${MEDICATIONS_COLLECTION_NAME} with substring=${name}`
        );
    }
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
        const medication: Medication = docSnap.data() as Medication;

        medication.id = docSnap.id;

        return medication;
    } else {
        throw new ProjectError(
            'INVALID_MEDICATION_ID_ERROR',
            `No medication with id=${id} exists`
        );
    }
};

export const createMedication = async (
    db: Firestore,
    medication: MedicationData
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
