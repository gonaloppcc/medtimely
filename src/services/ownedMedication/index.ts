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
    updateDoc,
    where,
} from 'firebase/firestore';
import { ProjectError } from '../error';
import { USERS_COLLECTION_NAME } from '../users';
import { getMedication } from '../medications';
import { GROUPS_COLLECTION_NAME } from '../groups';

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

export const OWNED_MEDICATIONS_COLLECTION = 'ownedMedications';
const getUserOwnedMedicationCollection = (db: Firestore, uid: string) => {
    return collection(
        db,
        `${USERS_COLLECTION_NAME}/${uid}/${OWNED_MEDICATIONS_COLLECTION}`
    );
};

const getGroupOwnedMedicationCollection = (db: Firestore, groupId: string) => {
    return collection(
        db,
        `${GROUPS_COLLECTION_NAME}/${groupId}/${OWNED_MEDICATIONS_COLLECTION}`
    );
};

export function getOwnedMedicationPath({
    userId,
    groupId,
    ownedMedicationId,
}: {
    userId?: string;
    groupId?: string;
    ownedMedicationId?: string;
}): string {
    const pt1 = groupId
        ? `/${GROUPS_COLLECTION_NAME}/${groupId}/${OWNED_MEDICATIONS_COLLECTION}`
        : `/${USERS_COLLECTION_NAME}/${userId}/${OWNED_MEDICATIONS_COLLECTION}`;
    return ownedMedicationId ? `${pt1}/${ownedMedicationId}` : `${pt1}`;
}

// ownedMedicationId is a full document reference path!!
export const getOwnedMedication = async (
    db: Firestore,
    ownedMedicationId: string
): Promise<OwnedMedication> => {
    console.log(
        `Fetching owned medication with ownedMedicationId=${ownedMedicationId}`
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

                ownedMedication.id = doc.ref.path;

                return ownedMedication;
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

export const getGroupOwnedMedications = async (
    db: Firestore,
    groupId: string,
    maxNumber: number = 10
): Promise<OwnedMedication[]> => {
    console.log(`Fetching stock for group with id=${groupId}`);

    const ownedMedicationCollection = collection(
        db,
        `${GROUPS_COLLECTION_NAME}/${groupId}/${OWNED_MEDICATIONS_COLLECTION}`
    );

    const q = query(ownedMedicationCollection, limit(maxNumber));

    try {
        const querySnapshot = await getDocs(q);

        return Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const ownedMedication = doc.data() as OwnedMedication;

                ownedMedication.id = doc.ref.path;

                return ownedMedication;
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

export const getOwnedMedicationsByName = async (
    db: Firestore,
    userId: string,
    name: string,
    groupId?: string,
    maxDocuments: number = 5
): Promise<OwnedMedication[]> => {
    const collectionPath = getOwnedMedicationPath({ userId, groupId });
    const ownedMedicationCollection = collection(db, collectionPath);
    const q = query(
        ownedMedicationCollection,
        where('name', '>=', name),
        where('name', '<=', name + '\uf8ff'), // https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
        limit(maxDocuments)
    );

    try {
        const medications: OwnedMedication[] = [];

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const medication: OwnedMedication = doc.data() as OwnedMedication;

            medication.id = `${collectionPath}/${doc.id}`;

            medications.push(medication);
        });

        return medications;
    } catch (err) {
        console.error('Error performing firebase query: ', err);
        throw new ProjectError(
            'GETTING_OWNED_MEDICATIONS_BY_NAME_ERROR',
            `Error getting document on path=${collectionPath} with substring=${name}`
        );
    }
};

export const createOwnedMedicationWithMedicationId = async (
    db: Firestore,
    uid: string,
    ownedMedication: OwnedMedicationWithoutMedicationFields
): Promise<string> => {
    console.log(
        `Creating owned medication for user with id=${uid} with ownedMedicationWithoutMedicationFields=${JSON.stringify(
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
    console.log(`Creating owned medication for user with id=${uid}`);

    const ownedMedicationCollection = getGroupOwnedMedicationCollection(
        db,
        uid
    );

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

export const createOwnedMedicationOnGroup = async (
    db: Firestore,
    groupId: string,
    ownedMedication: OwnedMedicationData
): Promise<string> => {
    console.log(`Creating owned medication for group with id=${groupId}`);

    const ownedMedicationCollection = getGroupOwnedMedicationCollection(
        db,
        groupId
    );

    if (
        ownedMedication.medicationId === undefined ||
        ownedMedication.medicationId === ''
    ) {
        delete ownedMedication.medicationId;
    }

    try {
        const docRef = await addDoc(ownedMedicationCollection, ownedMedication);

        console.log(`Created ownedMedication with id=${docRef.id}`);

        return docRef.path;
    } catch (err) {
        console.error('Error creating document: ', err);
        throw new ProjectError(
            'CREATING_OWNED_MEDICATION_ERROR',
            `Error creating document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }
};

export const updateOwnedMedicationStock = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string,
    stock: number
): Promise<void> => {
    console.log(
        `Updating owned medication for user with id=${uid} and ownedMedicationId=${ownedMedicationId} with stock=${stock}`
    );

    const ownedMedicationRef = doc(db, ownedMedicationId);

    try {
        await updateDoc(ownedMedicationRef, {
            stock: stock,
        });
    } catch (err) {
        console.error('Error updating document: ', err);
        throw new ProjectError(
            'UPDATING_OWNED_MEDICATION_ERROR',
            `Error updating document on path=${OWNED_MEDICATIONS_COLLECTION}`
        );
    }
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
