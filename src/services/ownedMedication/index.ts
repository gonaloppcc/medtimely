import { MedicationRecordForm } from '../../model/medicationRecord';
import {
    OwnedMedication,
    OwnedMedicationData,
    OwnedMedicationWithoutMedicationFields,
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

// ownedMedicationId is a full document reference path!!
export const getOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string
): Promise<OwnedMedication> => {
    console.log(
        `Fetching stock for user with id=${uid} and ownedMedicationId=${ownedMedicationId}`
    );

    const ownedMedicationDoc = doc(db, ownedMedicationId);

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

    ownedMedication.id = docSnapshot.ref.path;

    console.log('ownedMedication', JSON.stringify(ownedMedication));

    // Fetch the medication document data too and merge it with the owned medication
    const medication = ownedMedication.medicationId
        ? await getMedication(db, ownedMedication.medicationId)
        : {};

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

                // full path as id
                ownedMedication.id = doc.ref.path;

                // console.log('ownedMedication', JSON.stringify(ownedMedication));

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

export const createOwnedMedicationWithMedicationId = async (
    db: Firestore,
    uid: string,
    ownedMedication: OwnedMedicationWithoutMedicationFields
): Promise<string> => {
    console.log(
        `creating owned medication for user with id=${uid} with ownedMedicationWithoutMedicationFields=${JSON.stringify(
            ownedMedication
        )}`
    );

    const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    try {
        const medication = await getMedication(
            db,
            ownedMedication.medicationId
        );

        const ownedMedicationWithMedication: OwnedMedicationData = {
            ...medication,
            ...ownedMedication,
        };

        const docRef = await addDoc(
            ownedMedicationCollection,
            ownedMedicationWithMedication
        );

        console.log(`created ownedMedication with id=${docRef.id}`);

        return docRef.path;
    } catch (err) {
        console.error('Error creating document: ', err);
        throw new ProjectError(
            'CREATING_OWNED_MEDICATION_ERROR',
            `Error creating document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }
};

export const createOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedication: OwnedMedicationData
): Promise<string> => {
    console.log(`creating owned medication for user with id=${uid}`);

    const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    if (
        ownedMedication.medicationId === undefined ||
        ownedMedication.medicationId === ''
    ) {
        delete ownedMedication.medicationId;
    }

    try {
        const docRef = await addDoc(ownedMedicationCollection, ownedMedication);

        console.log(`created ownedMedication with id=${docRef.id}`);

        return docRef.path;
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

// TODO check if id should be full path
export const deleteOwnedMedication = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string
): Promise<void> => {
    console.log(
        `Deleting owned medication for user with id=${uid} and ownedMedicationId=${ownedMedicationId}`
    );

    //const ownedMedicationCollection = getUserOwnedMedicationCollection(db, uid);

    //const ownedMedicationDoc = doc(
    //    ownedMedicationCollection,
    //    ownedMedicationId
    //);
    // If id is full path
    const ownedMedicationDoc = doc(db, ownedMedicationId);

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
