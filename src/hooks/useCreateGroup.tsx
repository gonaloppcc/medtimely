import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Group } from '../model/group';
import { createGroup } from '../services/groups';
import { db } from '../firebase';

interface UseCreateGroupReturn {
    createGroup: (group: Group) => Promise<string>;
}

export const useCreateGroup = (
    userid: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseCreateGroupReturn => {
    const queryClient = useQueryClient();
    const createGroupMutation = useMutation({
        mutationFn: async (group: Group) => {
            return await createGroup(db, group, userid);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['groups'],
            });
            onSuccess();
        },
        onError,
    });

    return {
        createGroup: async (group: Group) =>
            await createGroupMutation.mutateAsync(group),
    };
};
