import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecord } from '../services/records';
import { db } from '../firebase';

interface UseDeleteRecordReturn {
    deleteRecord: (recordId: string) => Promise<void>;
}

export const useDeleteRecord = (
    userId: string,
    date: Date,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseDeleteRecordReturn => {
    const queryClient = useQueryClient();
    const deleteRecordMutation = useMutation({
        mutationFn: async (recordId: string) => {
            return await deleteRecord(db, userId, recordId);
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['records', date, userId],
            });
            onSuccess();
        },
        onError,
    });

    return {
        deleteRecord: async (recordId: string) =>
            await deleteRecordMutation.mutateAsync(recordId),
    };
};
