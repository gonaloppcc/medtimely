import { Group } from '../../model/group';
import { User } from '../../model/user';
import {
    DocumentReference,
    DocumentSnapshot,
    doc,
    getDoc,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';

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
            //const groupDocRef: DocumentReference = doc(
            //    db,
            //    GROUPS_COLLECTION_NAME,
            //    groupId
            //);
            const groupDocSnapshot: DocumentSnapshot = await getDoc(groupRef);
            if (!groupDocSnapshot.exists()) {
                throw new Error(`Group with id=${groupRef.id} does not exist`);
            }

            const userRefInGroup = groupDocSnapshot.data()?.users || [];
            console.log(userRefInGroup);
            const usersData: User[] = await getUsersInGroup(db, userRefInGroup);
            console.log(usersData);

            return {
                id: groupDocSnapshot.id,
                ...groupDocSnapshot.data(),
                users: usersData,
            } as Group;
        })
    );
    console.log(groupsData);
    return groupsData;
};

const getUsersInGroup = async (
    db: Firestore,
    userRefs: DocumentReference[]
): Promise<User[]> => {
    return Promise.all(
        userRefs.map(async (userRef) => {
            //const userDocRef: DocumentReference = doc(
            //    db,
            //    USERS_COLLECTION_NAME,
            //    userId
            //);
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
