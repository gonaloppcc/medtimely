import { Group } from '../../model/group';
import { MedicationRecordForm } from '../../model/medicationRecord';
import { User } from '../../model/user';
import {
    DocumentReference,
    DocumentSnapshot,
    doc,
    getDoc,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';

const USERS_COLLECTION_NAME = 'users';
//const GROUPS_COLLECTION_NAME = 'groups';

export const getUserGroups = async (
    db: Firestore,
    userId: string
): Promise<Group[]> => {
    console.log(`Fetching groups for userId=${userId}`);

    const userDocRef: DocumentReference = doc(
        db,
        USERS_COLLECTION_NAME,
        userId
    );
    const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);

    //if (!userDocSnapshot.exists()) {
    //    throw new Error(`User with id=${userId} does not exist`);
    //}

    const groupRefs: DocumentReference[] = userDocSnapshot.data()?.groups || [];

    const groupsData = await Promise.all(
        groupRefs.map(async (groupRef) => {
            const groupDocSnapshot: DocumentSnapshot = await getDoc(groupRef);
            if (!groupDocSnapshot.exists()) {
                throw new Error(`Group with id=${groupRef.id} does not exist`);
            }

            const userRefInGroup = groupDocSnapshot.data()?.users || [];
            const usersData: User[] = await getUsersInGroup(userRefInGroup);

            return {
                id: groupDocSnapshot.id,
                ...groupDocSnapshot.data(),
                users: usersData,
            } as Group;
        })
    );
    groupsData.push({
        id: 'testId',
        name: 'testName',
        description: 'testDescription',
        users: [
            {
                id: 'testUserId',
                firstname: 'testFs',
                lastname: 'testLs',
                records: [
                    {
                        id: 'testRecordId',
                        name: 'testRecord',
                        dosage: 'testDosage',
                        form: MedicationRecordForm.CAPSULE,
                        units: 10,
                        missed: true,
                        scheduledTime: new Date(2024, 0, 13, 12, 30, 0),
                    },
                ],
                medications: [],
                groups: [],
            },
        ],
        sharedMeds: ['med1', 'med2', 'med3'],
        treatmentPermissions: 'view',
        hasSharedStock: true,
    });
    return groupsData;
};

const getUsersInGroup = async (
    userRefs: DocumentReference[]
): Promise<User[]> => {
    return Promise.all(
        userRefs.map(async (userRef) => {
            const userDocSnapshot: DocumentSnapshot = await getDoc(userRef);
            if (!userDocSnapshot.exists()) {
                throw new Error(`User with id=${userRef.id} does not exist`);
            }
            // FIXME
            return {
                id: userDocSnapshot.id,
                ...userDocSnapshot.data(),
            } as User;
        })
    );
};
