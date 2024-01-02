import { useMutation } from '@tanstack/react-query';
import { Group } from '../model/group';
import { createGroup } from '../services/groups';

interface UseCreateGroupReturn {
    createGroup: (group: Group) => Promise<string>;
}

export const useCreateGroup = (
    token: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseCreateGroupReturn => {
    const createGroupMutation = useMutation({
        mutationFn: async (group: Group) => {
            return await createGroup(token, group);
        },
        onSuccess,
        onError,
    });

    return {
        createGroup: async (group: Group) =>
            await createGroupMutation.mutateAsync(group),
    };
};
