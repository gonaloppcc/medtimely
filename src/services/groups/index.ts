import { Group } from '../../model/group';

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
