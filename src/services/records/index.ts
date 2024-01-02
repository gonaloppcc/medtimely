// noinspection SpellCheckingInspection
import { db } from '../../../firebaseConfig';
import {
    getDocs,
    collection,
    query,
    where,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDoc,
    addDoc,
    Timestamp,
} from 'firebase/firestore';

import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../model/MedicationRecord';

import dayjs from 'dayjs';

const SMALL_STALL_TIME = 1000;
const RECORDS_COLLECTION = 'medicationRecords';
const records = collection(db, RECORDS_COLLECTION);

export const getRecords = async (
    token: string,
    date: Date
): Promise<MedicationRecord[]> => {
    console.log(
        `Fetching records in date=${date.toDateString()} for token=${token}`
    );

    // date is stored as timestamp in the db
    const startDate = dayjs(date).startOf('day').toDate();
    const endDate = dayjs(date).endOf('day').toDate();

    // TODO: get only records of current user
    const q = query(
        records,
        //where('user', '==', token),
        where('scheduledTime', '<=', endDate),
        where('scheduledTime', '>=', startDate)
    );
    // todo: use onSnapshot
    const matchDocs = await getDocs(q);

    const matchRecords: MedicationRecord[] =
        matchDocs.docs.map(snapshotToRecord);
    console.log(matchRecords);
    return matchRecords;
};
const RECORD: MedicationRecord = {
    name: 'Fluoxetine',
    dosage: '400mg',
    form: MedicationRecordForm.TABLET,
    amount: 3,
    missed: true,
    scheduledTime: new Date(),
};
export const getRecord = async (
    token: string,
    id: string
): Promise<MedicationRecord> => {
    console.log(`Fetching record with id=${id} for token=${token}`);

    const docRef: DocumentReference = doc(db, RECORDS_COLLECTION, id);
    try {
        const docSnap: DocumentSnapshot = await getDoc(docRef);
        if (docSnap.exists()) {
            return snapshotToRecord(docSnap);
        } else {
            throw new Error(`No record with id=${id} exists`);
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const createRecord = async (
    token: string,
    record: MedicationRecord
): Promise<string> => {
    console.log(`Creating record=${record} for token=${token}`);

    const docRef = await addDoc(collection(db, RECORDS_COLLECTION), {
        ...record,
        scheduledTime: Timestamp.fromDate(record.scheduledTime),
        user: doc(db, 'users', token),
    });
    return docRef.id;
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
        }, SMALL_STALL_TIME);
    });
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
