import {
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    signOut as signOutFirebase,
} from "firebase/auth";
import {auth} from "../../../firebaseConfig";
import {User as UserFirebase} from "@firebase/auth";

type User = UserFirebase


const createUserWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    const userCredentials = await createUserWithEmailAndPasswordFirebase(auth, email, password)

    return userCredentials.user
}

const loginWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    const userCredentials = await signInWithEmailAndPasswordFirebase(auth, email, password)

    return userCredentials.user
}

const onAuthStateChanged = () => {

}

const signOut = (): Promise<void> => {
    return signOutFirebase(auth)
}

export {createUserWithEmailAndPassword, loginWithEmailAndPassword, signOut}
