import { Group, GroupData } from '../../model/group';
import { MedicationRecordForm } from '../../model/medicationRecord';
import { User } from '../../model/user';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    DocumentSnapshot,
    FieldValue,
    Firestore,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { ProjectError } from '../error';

const USERS_COLLECTION_NAME = 'users';
const GROUPS_COLLECTION_NAME = 'groups';

export const getUserGroups = async (
    db: Firestore,
    userId: string
): Promise<Group[]> => {
    console.log(`Fetching groups for user with id=${userId}`);

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
            const usersData: User[] = await getUsersByRef(userRefInGroup);

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

// TODO: create getUser
const getUsersByRef = async (
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

export const getGroup = async (
    db: Firestore,
    groupId: string
): Promise<Group> => {
    const groupDocRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    const groupDocSnapshot: DocumentSnapshot = await getDoc(groupDocRef);

    if (!groupDocSnapshot.exists()) {
        throw new ProjectError(
            'INVALID_GROUP_ID_ERROR',
            `Group with id=${groupId} not found`
        );
    }

    const userRefInGroup = groupDocSnapshot.data()?.users || [];
    const usersData: User[] = await getUsersByRef(userRefInGroup);

    return {
        id: groupDocSnapshot.id,
        ...groupDocSnapshot.data(),
        users: usersData,
    } as Group;
};
// Maybe store the user that created so that only that user can delete the group
export const createGroup = async (
    db: Firestore,
    groupData: GroupData,
    userId: string
): Promise<string> => {
    const userRef: DocumentReference = doc(db, USERS_COLLECTION_NAME, userId);
    const groupRef = await addDoc(collection(db, GROUPS_COLLECTION_NAME), {
        ...groupData,
        users: [userRef],
    });
    await updateDoc(userRef, { groups: arrayUnion(groupRef) });

    return groupRef.id;
};

export const addUserToGroup = async (
    db: Firestore,
    groupId: string,
    userId: string
): Promise<void> => {
    await addOrRemoveUserFromGroup(db, groupId, userId, arrayUnion);
};

export const removeUserFromGroup = async (
    db: Firestore,
    groupId: string,
    userId: string
): Promise<void> => {
    await addOrRemoveUserFromGroup(db, groupId, userId, arrayRemove);
};

const addOrRemoveUserFromGroup = async (
    db: Firestore,
    groupId: string,
    userId: string,
    arrayFun: (...elements: unknown[]) => FieldValue
): Promise<string> => {
    const groupRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    const userRef: DocumentReference = doc(db, USERS_COLLECTION_NAME, userId);

    await updateDoc(groupRef, { users: arrayFun(userRef) });
    await updateDoc(userRef, { groups: arrayFun(groupRef) });

    return groupRef.id;
};

export const updateGroup = async (
    db: Firestore,
    groupId: string,
    group: GroupData
): Promise<void> => {
    const groupRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    await updateDoc(groupRef, group);
};

export const deleteGroup = async (
    db: Firestore,
    groupId: string
): Promise<void> => {
    const groupRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    const groupDocSnapshot: DocumentSnapshot = await getDoc(groupRef);
    const userRefInGroup: DocumentReference[] = groupDocSnapshot.data()?.users;
    await Promise.all(
        userRefInGroup.map((userRef) => {
            updateDoc(userRef, { groups: arrayRemove(groupRef) });
        })
    );
    await deleteDoc(groupRef);
};
