import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebase';
import { removeUserFromGroup } from '../services/groups';

interface UseDeleteGroupMemberReturn {
    deleteGroupMember: (groupId: string) => Promise<void>;
}

export const useDeleteGroupMember = (
    groupId,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseDeleteGroupMemberReturn => {
    const queryClient = useQueryClient();
    const deleteGroupMemberMutation = useMutation({
        mutationFn: async (userId: string) => {
            return await removeUserFromGroup(db, groupId, userId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['group', groupId],
            });
            onSuccess();
        },
        onError,
    });

    return {
        deleteGroupMember: async (userId) =>
            await deleteGroupMemberMutation.mutateAsync(userId),
    };
};
