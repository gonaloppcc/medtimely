import {
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    onAuthStateChanged as onAuthStateChangedFirebase,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    signOut as signOutFirebase,
} from 'firebase/auth';
import {auth} from '../../../firebaseConfig';
import {User as UserFirebase} from '@firebase/auth';

type User = UserFirebase;

const createUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<User> => {
    const userCredentials = await createUserWithEmailAndPasswordFirebase(
        auth,
        email,
        password
    );

    return userCredentials.user;
};

const loginWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<User> => {
    const userCredentials = await signInWithEmailAndPasswordFirebase(
        auth,
        email,
        password
    );

    return userCredentials.user;
};

const onAuthStateChanged = (callback: (user: User) => void): (() => void) => {
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
};
