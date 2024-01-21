import { doc, Firestore, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { OptionalInfo, User } from '../../model/user';
import { ProjectError } from '../error';

export const USERS_COLLECTION_NAME = 'users';

export const createUserDoc = async (
    db: Firestore,
    id: string,
    firstname: string,
    lastname: string,
    hasOptionalInfo: boolean,
    optionalValues?: OptionalInfo
): Promise<string> => {
    console.log(
        `Creating user with name="${firstname} ${lastname}" with id=${id}`
    );

    let userData: User;
    if (hasOptionalInfo) {
        userData = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            groups: [],
            optionalInfo: optionalValues,
        };
    } else {
        userData = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            groups: [],
        };
    }

    try {
        const docRef = doc(db, USERS_COLLECTION_NAME, id);

        await setDoc(docRef, userData);

        console.log(`Created user with id=${docRef.id}`);

        return docRef.id;
    } catch (err) {
        console.error('Error creating document: ', err);
        throw new ProjectError(
            'CREATING_USER_ERROR',
            `Error creating document on path=${USERS_COLLECTION_NAME} with data=${JSON.stringify(
                userData
            )}`
        );
    }
};

export const getUserDoc = async (db: Firestore, userId: string) => {
    try {
        const userDocRef = doc(db, USERS_COLLECTION_NAME, userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            console.warn(`User with id=${userId} not found`);
            return null;
        }
    } catch (error) {
        console.error('Error getting user document: ', error);
        throw error; 
    }
};

export const deleteUserDoc = async (db: Firestore, userId: string): Promise<void> => {
    try {
        const userDocRef = doc(db, USERS_COLLECTION_NAME, userId);
        
        await deleteDoc(userDocRef);

        console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; 
    }
};
