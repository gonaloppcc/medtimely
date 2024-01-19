import { MedicationRecordForm } from '../../model/medicationRecord';
import {
    OwnedMedication,
    OwnedMedicationData,
} from '../../model/ownedMedication';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    limit,
    query,
} from 'firebase/firestore';
import { ProjectError } from '../error';
import { USERS_COLLECTION_NAME } from '../users';
import { getMedication } from '../medications';

export const OWNED_MEDICATION: OwnedMedication = {
    activeSubstance: '',
    administration: '',
    aimTitular: '',
    commercialisation: false,
    dosage: '12 mg',
    form: MedicationRecordForm.AEROSOL,
    id: '1',
    isGeneric: false,
    medicationId: '',
    name: 'Brufen',
    presentations: [],
    stock: 12,
};

const OWNED_MEDICATIONS_COLLECTION = 'ownedMedications';
const getUserOwnedMedicationCollection = (db: Firestore, uid: string) => {
    return collection(
        db,
        `${USERS_COLLECTION_NAME}/${uid}/${OWNED_MEDICATIONS_COLLECTION}`
    );
};

export const getOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string
): Promise<OwnedMedication> => {
    console.log(
        `Fetching stock for user with id=${uid} and ownedMedicationId=${ownedMedicationId}`
    );

    const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    const ownedMedicationDoc = doc(
        ownedMedicationCollection,
        ownedMedicationId
    );

    let docSnapshot: DocumentSnapshot;

    try {
        docSnapshot = await getDoc(ownedMedicationDoc);
    } catch (err) {
        console.error('Error performing firebase query: ', err);
        throw new ProjectError(
            'GETTING_OWNED_MEDICATION_ERROR',
            `Error getting document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }

    if (!docSnapshot.exists()) {
        throw new ProjectError(
            'INVALID_OWNED_MEDICATION_ID_ERROR',
            `Document with id=${ownedMedicationId} does not exist on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }

    const ownedMedication = docSnapshot.data() as OwnedMedication;

    ownedMedication.id = docSnapshot.id;

    console.log('ownedMedication', JSON.stringify(ownedMedication));

    // Fetch the medication document data too and merge it with the owned medication
    const medication = await getMedication(db, ownedMedication.medicationId);

    return {
        ...medication,
        ...ownedMedication,
    };
};

// Only the user's owned medications are returned
// Meaning the group ones are not returned
export const getUserOwnedMedications = async (
    db: Firestore,
    uid: string,
    maxNumber: number = 10
): Promise<OwnedMedication[]> => {
    console.log(
        `Fetching stock for user with id=${uid} with maxNumber=${maxNumber}`
    );

    const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    const q = query(ownedMedicationCollection, limit(maxNumber));

    try {
        const querySnapshot = await getDocs(q);

        return Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const ownedMedication = doc.data() as OwnedMedication;

                ownedMedication.id = doc.id;

                console.log('ownedMedication', JSON.stringify(ownedMedication));

                return ownedMedication;

                // Fetch the medication document data too and merge it with the owned medication
                // const medication = await getMedication(
                //     db,
                //     ownedMedication.medicationId
                // );

                // return {
                //     ...medication,
                //     ...ownedMedication,
                // };
            })
        );
    } catch (err) {
        console.error('Error performing firebase query: ', err);
        throw new ProjectError(
            'GETTING_OWNED_MEDICATIONS_ERROR',
            `Error getting document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }
};

export const getUserGroupOwnedMedications = async (
    db: Firestore,
    uid: string,
    groupId: string
): Promise<OwnedMedication[]> => {
    console.log(
        `Fetching stock for user with id=${uid} and groupId=${groupId}`
    );

    // TODO: Implement this

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Array(10).fill(OWNED_MEDICATION));
        }, 1000);
    });
};

export const createOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedication: OwnedMedicationData
): Promise<string> => {
    console.log(`creating owned medication for user with id=${uid}`);

    const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    // If there's a medicationId, try to get that medication's data to autofill
    if (ownedMedication.medicationId && ownedMedication.medicationId !== '') {
        const medication = await getMedication(
            db,
            ownedMedication.medicationId
        );

        ownedMedication = {
            ...medication,
            ...ownedMedication,
        };
    }

    try {
        const docRef = await addDoc(ownedMedicationCollection, ownedMedication);

        console.log(`created record with id=${docRef.id}`);

        return docRef.id;
    } catch (err) {
        console.error('Error creating document: ', err);
        throw new ProjectError(
            'CREATING_OWNED_MEDICATION_ERROR',
            `Error creating document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }
};

export const updateOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedication: OwnedMedicationData
): Promise<OwnedMedication> => {
    console.log(
        `Updating owned medication for user with id=${uid} with data=${JSON.stringify(
            ownedMedication
        )}`
    );

    // TODO: Implement this

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(OWNED_MEDICATION);
        }, 1000);
    });
};

export const deleteOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string
): Promise<void> => {
    console.log(
        `Deleting owned medication for user with id=${uid} and ownedMedicationId=${ownedMedicationId}`
    );

    const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    const ownedMedicationDoc = doc(
        ownedMedicationCollection,
        ownedMedicationId
    );

    try {
        await deleteDoc(ownedMedicationDoc);
    } catch (err) {
        console.error('Error deleting document: ', err);
        throw new ProjectError(
            'DELETING_OWNED_MEDICATION_ERROR',
            `Error deleting document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }
};
