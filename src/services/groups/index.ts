import { Group } from '../../model/group';
<<<<<<< Updated upstream

const GROUPS: Group[] = [
    {
        groupName: "group 1",
        description: "description 1"
    },
    {
        groupName: "group 2",
        description: "description 2"
    },
    {
        groupName: "group 3",
        description: "description 3"
    },
    {
        groupName: "group 4",
        description: "description 4"
    }

]

const SMALL_STALL_TIME = 1000;
const STALL_TIME = 4000;

export const getGroups = async (
    token: string
): Promise<Group[]> => {
    console.log(
        `Fetching groups for token=${token}`
    )

    return new Promise((resolve) => {
        setTimeout(() => {
=======
import { User } from '../../model/user';
import {
    DocumentReference,
    DocumentSnapshot,
    doc,
    getDoc,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { MedicationRecordForm } from '../../model/medicationRecord';



const USERS_COLLECTION_NAME = 'users';
//const GROUPS_COLLECTION_NAME = 'groups';

export const getUserGroups = async (
    db: Firestore,
    userId: string
): Promise<Group[]> => {
    console.log(`Fetching groups for userId=${userId}`);

    console.log("Hello");

    const userDocRef: DocumentReference = doc(
        db,
        USERS_COLLECTION_NAME,
        userId
    );
    
    console.log("Hello2");
    const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);
    
    console.log("Hello3");

    // if (!userDocSnapshot.exists()) {
    //     throw new Error(`User with id=${userId} does not exist`);
    //}
    
    console.log("Hello4");

    const groupRefs: DocumentReference[] = userDocSnapshot.data()?.groups || [];
    console.log("hello")
    const groupsData = await Promise.all(
        groupRefs.map(async (groupRef) => {
            const groupDocSnapshot: DocumentSnapshot = await getDoc(groupRef);
            if (!groupDocSnapshot.exists()) {
                throw new Error(`Group with id=${groupRef.id} does not exist`);
            }
            const userRefInGroup = groupDocSnapshot.data()?.users || [];
            const usersData: User[] = await getUsersInGroup(userRefInGroup);

            return {
                id: groupDocSnapshot.id,
                ...groupDocSnapshot.data(),
                users: usersData,
            } as Group;
        })
    );
    console.log("Hello");
    groupsData.push( {
        id: "testId",
        name: "testName",
        description: "testDescription",
        users: [{
            id:"testUserId",
            firstname:"testFs",
            lastname: "testLs",
            records: [{
                id: "testRecordId",
                name: "testRecord",
                dosage: "testDosage",
                form: MedicationRecordForm.CAPSULE,
                units: 10,
                missed: true,
                scheduledTime: new Date(2024, 0, 13, 12, 30, 0)
            }],
            medications: [],
            groups: []
        }],
        sharedMeds: ["med1", "med2", "med3"],
        treatmentPermissions: 'view',
        hasSharedStock: true,

    })
    console.log(groupsData);
    return groupsData;
};
>>>>>>> Stashed changes

            resolve(GROUPS)
        }, STALL_TIME)
    })
}

export const createGroup = async(
    token: string,
    group: Group
): Promise<string> => {
    console.log(`Creating group for token=${token}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            GROUPS.push(group)

            resolve("CreatedID");
        }, SMALL_STALL_TIME)
    })
}
