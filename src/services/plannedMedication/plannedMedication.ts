import {
    OwnedMedication,
    PlannedMedication,
    PlannedMedicationSchedule,
} from '../../model/ownedMedication';

import { createRecord } from '../records';
import { getOwnedMedication } from '../ownedMedication';
import {
    doc,
    DocumentSnapshot,
    Firestore,
    getDoc,
    runTransaction,
    Timestamp,
    Transaction,
} from 'firebase/firestore';
import { MedicationRecordData } from '../../model/medicationRecord';

const USERS_COLLECTION_NAME = 'users';

export const getPlannedMedications = async (
    db: Firestore,
    uid: string
): Promise<PlannedMedication[]> => {
    console.log(`Fetching all planned medications for user with id=${uid}`);

    const userRef = doc(db, USERS_COLLECTION_NAME, uid);

    try {
        const querySnapshot: DocumentSnapshot = await getDoc(userRef);
        if (!querySnapshot.exists()) {
            console.log("User doesn't exist");
            throw new Error('User does not exist');
        }
        // Object type
        const plannedMedications = querySnapshot.data()?.plannedMedications;
        if (!plannedMedications) {
            return [];
        }
        const planned = await plannedMedicationsFirestoreToView(
            db,
            uid,
            plannedMedications
        );
        return planned;
    } catch (e) {
        throw new Error(e);
    }
};

interface PlannedMedicationsFirestore {
    // key is OwnedMedication id
    [key: string]: PlannedMedicationFirestore;
}

interface PlannedMedicationFirestore {
    doseToBeTaken: number;
    startDate: Timestamp;
    endDate?: Timestamp;
    timeBetweenDosesInHours: number;
}

function addSlashIfMissing(inputString: string): string {
    return inputString.startsWith('/') ? inputString : '/' + inputString;
}

export const getPlannedMedicationById = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string
): Promise<PlannedMedication> => {
    ownedMedicationId = addSlashIfMissing(ownedMedicationId);
    console.log('Fetching planned medication with id', ownedMedicationId, uid);
    const userRef = doc(db, USERS_COLLECTION_NAME, uid);
    // try {
    const snapshot: DocumentSnapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
        throw new Error('User does not exist');
    }

    const plannedMedications: PlannedMedicationsFirestore =
        snapshot.data().plannedMedications;
    // TODO add check
    const plannedMedication: PlannedMedicationFirestore =
        plannedMedications[ownedMedicationId];
    console.log('Planned medication: ', plannedMedications);
    const s = await plannedMedicationFirestoreToView(
        db,
        uid,
        ownedMedicationId,
        plannedMedication
    );
    return s;
    // } catch (e) {
    //     throw new Error(e);
    // }
};

export const createPlannedMedication = async (
    db: Firestore,
    uid: string,
    plannedMedication: Omit<PlannedMedication, 'ownedMedication'>,
    ownedMedicationId: string
): Promise<void> => {
    ownedMedicationId = addSlashIfMissing(ownedMedicationId);

    console.log(
        `Creating plannedMedication=${JSON.stringify(
            plannedMedication
        )} for user with id=${uid} and ownedMedicationId=${ownedMedicationId}`
    );

    const userRef = doc(db, USERS_COLLECTION_NAME, uid);
    try {
        await runTransaction(db, async (transaction: Transaction) => {
            const userDoc: DocumentSnapshot = await transaction.get(userRef);

            if (!userDoc.exists()) {
                throw new Error('User does not exist');
            }

            const plannedMedicationsMap: PlannedMedicationsFirestore =
                userDoc.data()?.plannedMedications || {};

            plannedMedicationsMap[ownedMedicationId] =
                plannedMedicationViewToFirestore(plannedMedication);

            transaction.update(userRef, {
                plannedMedications: plannedMedicationsMap,
            });

        await createRecordsForPlannedMedication(db, uid, plannedMedication, ownedMedicationId);
        });
        console.log('Planned medication created successfully.');
    } catch (error) {
        console.error('Error creating planned medication:', error);
        throw new Error('Error creating planned medication');
    }
};

const buildRecordForPlanned = (
    plannedMedication: PlannedMedication,
    scheduledTime: Date
    ): MedicationRecordData => {
        const { name, dosage, form, id } = plannedMedication.ownedMedication;
        return {
            isPlanned : true,
            ownedMedicationRef: id,
            name: name,
            dosage: dosage,
            form: form,
            units: plannedMedication.doseToBeTaken,
            isTaken: false,
            scheduledTime: scheduledTime,
        }
    }

const createRecordsForPlannedMedication = async (
    db: Firestore,
    uid: string,
    plannedMedication: Omit<PlannedMedication, 'ownedMedication'>,
    ownedMedicationId: string
    ): Promise<void> => {
        // Up to 5 days after startDate  
        const ownedMedication: OwnedMedication= (await getOwnedMedication(db, ownedMedicationId))!;
        const plannedWithMedication: PlannedMedication = {
            ownedMedication, ...plannedMedication}
            
        let i = 0;
        const { schedule } = plannedMedication;
        const startDate = schedule.startDate
        for (let date = new Date(startDate); i < 5;  i++) {
            const record: MedicationRecordData = buildRecordForPlanned(plannedWithMedication, date);
            await createRecord(db, uid, record);
            // sets datetime to next scheduled time
            date.setHours(date.getHours()+schedule.timeBetweenDosesInHours)
        }
    }

const plannedMedicationViewToFirestore = (
    plannedMedication: Omit<PlannedMedication, 'ownedMedication'>
): PlannedMedicationFirestore => {
    const { doseToBeTaken, schedule } = plannedMedication;
    const plannedMedicationFirestore: PlannedMedicationFirestore = {
        doseToBeTaken,
        startDate: Timestamp.fromDate(schedule.startDate),
        timeBetweenDosesInHours: schedule.timeBetweenDosesInHours,
    };

    if (schedule.endDate)
        plannedMedicationFirestore.endDate = Timestamp.fromDate(
            schedule.endDate
        );
    return plannedMedicationFirestore;
};

const getSchedule = (
    plannedMedicationObj: PlannedMedicationFirestore
): PlannedMedicationSchedule => {
    const schedule: PlannedMedicationSchedule = {
        startDate: plannedMedicationObj.startDate.toDate(),
        endDate: plannedMedicationObj.endDate?.toDate(),
        timeBetweenDosesInHours: plannedMedicationObj.timeBetweenDosesInHours,
    };
    return schedule;
};

const plannedMedicationFirestoreToView = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string,
    plannedMedicationObj: PlannedMedicationFirestore
): Promise<PlannedMedication> => {
    const ownedMedication: OwnedMedication = (await getOwnedMedication(
        db,
        ownedMedicationId
    ))!;
    const plannedMedication: PlannedMedication = {
        ownedMedication: ownedMedication,
        doseToBeTaken: plannedMedicationObj.doseToBeTaken,
        schedule: getSchedule(plannedMedicationObj),
    };
    return plannedMedication;
};

const plannedMedicationsFirestoreToView = async (
    db: Firestore,
    uid: string,
    plannedMedications: PlannedMedicationsFirestore
): Promise<PlannedMedication[]> => {
    const plannedMedicationsArray: PlannedMedication[] = [];

    for (const [ownedMedicationId, plannedMedicationObj] of Object.entries(
        plannedMedications
    )) {
        // key is OwnedMedication id and is used to fetch the OwnedMedication
        const plannedMedication: PlannedMedication =
            await plannedMedicationFirestoreToView(
                db,
                uid,
                ownedMedicationId,
                plannedMedicationObj
            );

        plannedMedicationsArray.push(plannedMedication);
    }
    return plannedMedicationsArray;
};
