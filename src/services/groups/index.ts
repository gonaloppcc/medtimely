import { Group } from '../../model/group';

const GROUPS = {
    '1': [{
        name: "group 1",
        description: "description 1"
    }],
    '2': [{
        name: "group 2",
        description: "description 2"
    }],
    '3': [{
        name: "group 3",
        description: "description 3"
    }],
    '4': [{
        name: "group 4",
        description: "description 4"
    }]

}

const SMALL_STALL_TIME = 1000;
const STALL_TIME = 4000;

export const getGroups = async (
    token: string
): Promise<Group[]> => {
    console.log(
        `Fetching groups for token=${token}`
    )

    return new Promise((resolve) => {
        const groups = GROUPS[token]
        setTimeout(() => {
            if (!GROUPS) {
                resolve([])
                return;
            }

            resolve(groups)
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
            GROUPS[token].push(group)

            resolve("CreatedID");
        }, SMALL_STALL_TIME)
    })
}
