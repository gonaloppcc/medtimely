import { Group, GroupData } from '../../model/group';
import { User } from '../../model/user';
import {
    DocumentReference,
    DocumentSnapshot,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    collection,
    arrayUnion,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { ProjectError } from '../error';
//import { runTransaction } from 'firebase/firestore';

const USERS_COLLECTION_NAME = 'users';
const GROUPS_COLLECTION_NAME = 'groups';

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

    if (!userDocSnapshot.exists()) {
        throw new Error(`User with id=${userId} does not exist`);
    }

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
// TODO updateGroup, deleteGroup, addUserToGroup, removeUserFromGroup
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
