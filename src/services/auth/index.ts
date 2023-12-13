import {
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase
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

export {createUserWithEmailAndPassword, loginWithEmailAndPassword}
