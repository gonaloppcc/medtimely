import { Group, GroupData } from '../../model/group';
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
import { USERS_COLLECTION_NAME } from '../users';

export const GROUPS_COLLECTION_NAME = 'groups';

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
    return groupsData;
};

//TODO: Change
export const getMemberGroupById = async (
    db: Firestore,
    groupId: string,
    userId: string
): Promise<User> => {
    console.log(
        `Fetching member group with id=${userId} on groupId=${groupId}`
    );

    const user = {
        id: 'testUserId',
        firstname: 'João',
        lastname: 'Pedro',
        groups: [],
    } as User;

    return Promise.resolve(user);
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

export const getGroupById = async (
    db: Firestore,
    groupId: string
): Promise<Group> => {
    console.log(`Fetching group with id=${groupId}`);

    const groupDocRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    const groupDocSnapshot: DocumentSnapshot = await getDoc(groupDocRef); // TODO: Try and catch any errors here

    if (!groupDocSnapshot.exists()) {
        throw new ProjectError(
            'INVALID_GROUP_ID_ERROR',
            `Group with id=${groupId} not found`
        );
    }

    const userRefInGroup = groupDocSnapshot.data()?.users || [];
    const usersData: User[] = await getUsersByRef(userRefInGroup);

    console.log('Group fetched successfully');

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
    console.log(`Creating group with name=${groupData.name}`);

    const userRef: DocumentReference = doc(db, USERS_COLLECTION_NAME, userId);
    const groupRef = await addDoc(collection(db, GROUPS_COLLECTION_NAME), {
        ...groupData, // TODO: Try and catch any errors here
        users: [userRef],
    });
    await updateDoc(userRef, { groups: arrayUnion(groupRef) });

    console.log(`Created group with id=${groupRef.id}`);

    return groupRef.id;
};

export const addUserToGroup = async (
    db: Firestore,
    groupId: string,
    userId: string
): Promise<void> => {
    console.log(`Adding user with id=${userId} to group with id=${groupId}`);

    await addOrRemoveUserFromGroup(db, groupId, userId, arrayUnion);

    console.log(`User added to group successfully`);
};

export const removeUserFromGroup = async (
    db: Firestore,
    groupId: string,
    userId: string
): Promise<void> => {
    console.log(
        `Removing user with id=${userId} from group with id=${groupId}`
    );

    await addOrRemoveUserFromGroup(db, groupId, userId, arrayRemove);

    console.log(`User removed from group successfully`);
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
    console.log(
        `Updating group with id=${groupId} with data=${JSON.stringify(group)}`
    );

    const groupRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    await updateDoc(groupRef, group); // TODO: Try and catch any errors here

    console.log(`Group updated successfully`);
};

export const deleteGroup = async (
    db: Firestore,
    groupId: string
): Promise<void> => {
    console.log(`Deleting group with id=${groupId}`);

    const groupRef: DocumentReference = doc(
        db,
        GROUPS_COLLECTION_NAME,
        groupId
    );
    const groupDocSnapshot: DocumentSnapshot = await getDoc(groupRef); // TODO: Try and catch any errors here
    const userRefInGroup: DocumentReference[] = groupDocSnapshot.data()?.users;
    await Promise.all(
        userRefInGroup.map((userRef) => {
            updateDoc(userRef, { groups: arrayRemove(groupRef) });
        })
    );
    await deleteDoc(groupRef); // TODO: Try and catch any errors here

    console.log(`Group deleted successfully`);
};
