import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebase';
import { deleteGroup } from '../services/groups';

interface UseDeleteGroupReturn {
    deleteGroup: (groupId: string) => Promise<void>;
}

export const useDeleteGroup = (
    onSuccess: (groupId: string) => void,
    onError: (error: Error) => void
): UseDeleteGroupReturn => {
    const queryClient = useQueryClient();
    const deleteGroupMutation = useMutation({
        mutationFn: async (groupId: string) => {
            return await deleteGroup(db, groupId);
        },
        onSuccess: async (groupId: string) => {
            await queryClient.invalidateQueries({
                queryKey: ['groups'],
            });
            onSuccess(groupId);
        },
        onError,
    });

    return {
        deleteGroup: async (groupId: string) =>
            await deleteGroupMutation.mutateAsync(groupId),
    };
};
