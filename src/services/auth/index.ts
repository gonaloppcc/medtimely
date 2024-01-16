import {
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    onAuthStateChanged as onAuthStateChangedFirebase,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    signOut as signOutFirebase,
} from 'firebase/auth';
import { User as UserFirebase } from '@firebase/auth';
import { auth } from '../../firebase';
import { Firestore, addDoc, collection } from 'firebase/firestore';
import { ProjectError } from '../error';
import { OptionalInfo, User } from '../../model/user';

const USERS_COLLECTION_NAME = 'users';

const createUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserFirebase> => {
    const userCredentials = await createUserWithEmailAndPasswordFirebase(
        auth,
        email,
        password
    );

    return userCredentials.user;
};

const createUserDoc = async (
    db: Firestore,
    id: string,
    firstname: string,
    lastname: string,
    hasOptionalInfo: boolean,
    optionalValues?: OptionalInfo
): Promise<string> => {
    console.log(
        `Creating user with name=${firstname} ${lastname} and ID=${id}`
    );

    const usersCollection = collection(db, USERS_COLLECTION_NAME);

    let userData: User;
    if (hasOptionalInfo) {
        userData = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            records: [],
            medications: [],
            groups: [],
            optionalInfo: optionalValues,
        };
    } else {
        userData = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            records: [],
            medications: [],
            groups: [],
        };
    }

    try {
        const docRef = await addDoc(usersCollection, userData);

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

const loginWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserFirebase> => {
    const userCredentials = await signInWithEmailAndPasswordFirebase(
        auth,
        email,
        password
    );

    return userCredentials.user;
};

const onAuthStateChanged = (
    callback: (user: UserFirebase) => void
): (() => void) => {
    // TODO: Transform this type of callback to the one used by the firebase auth
    return onAuthStateChangedFirebase(auth, callback);
};

const signOut = (): Promise<void> => {
    return signOutFirebase(auth);
};

export {
    createUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserDoc,
};
