import { doc, Firestore, setDoc } from 'firebase/firestore';
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
