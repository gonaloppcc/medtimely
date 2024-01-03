// noinspection SpellCheckingInspection
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';

import { MedicationRecord } from '../../model/MedicationRecord';

import dayjs from 'dayjs';
import { ProjectError } from '../error';

const getUserRecordCollection = (db: Firestore, userId: string) => {
    return collection(db, `users/${userId}/records`);
};

const getUserRecordCollectionString = (userId: string) => {
    return `users/${userId}/records`;
};

export const getRecords = async (
    db: Firestore,
    userId: string,
    date: Date
): Promise<MedicationRecord[]> => {
    console.log(
        `Fetching records in date=${date.toDateString()} for user with id=${userId}`
    );

    // date is stored as timestamp in the db
    const startDate = dayjs(date).startOf('day').toDate();
    const endDate = dayjs(date).endOf('day').toDate();

    const userRecordCollection = getUserRecordCollection(db, userId);

    // TODO: Catch any possible errors here
    const q = query(
        userRecordCollection,
        where('scheduledTime', '<=', endDate),
        where('scheduledTime', '>=', startDate)
    );
    // todo: use onSnapshot
    const matchDocs = await getDocs(q);

    return matchDocs.docs.map(snapshotToRecord);
};

export const getRecord = async (
    db: Firestore,
    id: string,
    userId: string
): Promise<MedicationRecord> => {
    console.log(`Fetching record with id=${id} for user with id=${userId}`);

    const docRef: DocumentReference = doc(
        db,
        getUserRecordCollectionString(userId),
        id
    );

    let docSnap: DocumentSnapshot;

    try {
        docSnap = await getDoc(docRef);
    } catch (err) {
        console.error('Error getting document: ', err);
        throw new ProjectError(
            'GETTING_RECORD_ERROR',
            `Error getting document on path=${getUserRecordCollectionString(
                userId
            )}/${id}`
        );
    }

    if (docSnap.exists()) {
        return snapshotToRecord(docSnap);
    } else {
        throw new ProjectError(
            'INVALID_RECORD_ID_ERROR',
            `No record with id=${id} exists`
        );
    }
};

export const createRecord = async (
    db: Firestore,
    userId: string,
    record: MedicationRecord
): Promise<string> => {
    console.log(
        `Creating record=${JSON.stringify(record)} for user with id=${userId}`
    );

    const userRecordCollection = getUserRecordCollection(db, userId);

    try {
        const docRef = await addDoc(userRecordCollection, {
            ...record,
            scheduledTime: Timestamp.fromDate(record.scheduledTime),
        });

        console.log(`Created record with id=${docRef.id}`);

        return docRef.id;
        // @ts-expect-error TODO: fix this error
    } catch (err: FirestoreError) {
        console.error('Error adding document: ', err.message);
        throw new ProjectError(
            'ADDING_RECORD_ERROR',
            `Error adding document on path=${getUserRecordCollectionString(
                userId
            )} with data=${JSON.stringify(record)}`
        );
    }
};

export const updateRecord = async (
    db: Firestore,
    userId: string,
    recordId: string,
    record: MedicationRecord
): Promise<void> => {
    console.log(`Updating record=${record} for token=${userId}`);

    const userRecordCollection = getUserRecordCollection(db, userId);

    const docRef = doc(userRecordCollection, recordId);

    try {
        await updateDoc(docRef, {
            ...record,
            scheduledTime: Timestamp.fromDate(record.scheduledTime),
        });
    } catch (e) {
        console.error('Error updating document: ', e);
        throw new ProjectError(
            'UPDATING_RECORD_ERROR',
            `Error updating document on path=${getUserRecordCollectionString(
                userId
            )}/${recordId} with data=${JSON.stringify(record)}`
        );
    }
};

export const deleteRecord = async (
    db: Firestore,
    userId: string,
    recordId: string
): Promise<void> => {
    console.log(
        `Deleting record with id=${recordId} for user with id=${userId}`
    );

    const userRecordCollection = getUserRecordCollection(db, userId);

    try {
        await deleteDoc(doc(userRecordCollection, recordId));
    } catch (e) {
        console.error('Error deleting document: ', e);
        throw new Error(
            `Error deleting document on path=${getUserRecordCollectionString(
                userId
            )}/${recordId}`
        );
    }
};

const snapshotToRecord = (doc: DocumentSnapshot): MedicationRecord => {
    if (doc.exists()) {
        const data = doc.data();
        const scheduledTime = data.scheduledTime.toDate();
        return { ...data, scheduledTime, id: doc.id } as MedicationRecord;
    } else {
        throw new Error('Document does not exist');
    }
};
