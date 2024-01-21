import {
    OwnedMedication,
    PlannedMedication,
    PlannedMedicationSchedule,
} from '../../model/ownedMedication';

import { getOwnedMedication } from '../ownedMedication';
import {
    DocumentSnapshot,
    Firestore,
    getDoc,
    doc,
    Timestamp,
} from 'firebase/firestore';

const USERS_COLLECTION_NAME = 'users';

export const getPlannedMedications = async (
    db: Firestore,
    uid: string
): Promise<PlannedMedication[]> => {
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
        // console.log(
        //    plannedMedications[
        //        '/users/10wFfsLJ3KTCPsW8oTU42K5x3Xt1/ownedMedications/4USkR96NecLgHItCWxFy'
        //    ].startDate
        // );
        const planned = await plannedMedicationsObjectToArray(
            db,
            uid,
            plannedMedications
        );
        console.log(planned);
        return planned;
    } catch (e) {
        throw new Error('Error getting planned medications');
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

export const getPlannedMedicationById = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string
): Promise<PlannedMedication> => {
    const userRef = doc(db, USERS_COLLECTION_NAME, uid);
    try {
        const snapshot: DocumentSnapshot = await getDoc(userRef);
        if (!snapshot.exists()) {
            throw new Error('User does not exist');
        }
        const plannedMedications: PlannedMedicationsFirestore =
            snapshot.data()?.plannedMedications;
        // TODO add check
        const plannedMedication: PlannedMedicationFirestore =
            plannedMedications[ownedMedicationId];
        return await plannedMedicationObjectToArray(
            db,
            uid,
            ownedMedicationId,
            plannedMedication
        );
    } catch (e) {
        throw new Error('Error getting planned medication');
    }
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

const plannedMedicationObjectToArray = async (
    db: Firestore,
    uid: string,
    ownedMedicationId: string,
    plannedMedicationObj: PlannedMedicationFirestore
): Promise<PlannedMedication> => {
    const ownedMedication: OwnedMedication = await getOwnedMedication(
        db,
        uid,
        ownedMedicationId
    );
    const plannedMedication: PlannedMedication = {
        ownedMedication: ownedMedication,
        doseToBeTaken: plannedMedicationObj.doseToBeTaken,
        schedule: getSchedule(plannedMedicationObj),
    };
    return plannedMedication;
};

const plannedMedicationsObjectToArray = async (
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
            await plannedMedicationObjectToArray(
                db,
                uid,
                ownedMedicationId,
                plannedMedicationObj
            );

        plannedMedicationsArray.push(plannedMedication);
    }
    return plannedMedicationsArray;
};
