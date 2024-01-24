import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupData } from '../model/group';
import { createGroup } from '../services/groups';
import { db } from '../firebase';

interface UseCreateGroupReturn {
    createGroup: (group: GroupData) => Promise<string>;
}

export const useCreateGroup = (
    userid: string,
    onSuccess: (groupId: string) => void,
    onError: (error: Error) => void
): UseCreateGroupReturn => {
    const queryClient = useQueryClient();
    const createGroupMutation = useMutation({
        mutationFn: async (group: GroupData) => {
            return await createGroup(db, group, userid);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ['groups'],
            });
            onSuccess(data);
        },
        onError,
    });

    return {
        createGroup: async (group: GroupData) =>
            await createGroupMutation.mutateAsync(group),
    };
};
