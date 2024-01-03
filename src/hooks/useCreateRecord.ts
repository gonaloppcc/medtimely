import { MedicationRecord } from '../model/MedicationRecord';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecord } from '../services/records';
import { db } from '../firebase';

interface UseCreateRecordReturn {
    createRecord: (record: MedicationRecord) => Promise<string>;
}

export const useCreateRecord = (
    userId: string,
    onSuccess: (record: MedicationRecord) => void,
    onError: (error: Error) => void
): UseCreateRecordReturn => {
    const queryClient = useQueryClient();
    const createRecordMutation = useMutation({
        mutationFn: async (record: MedicationRecord) => {
            return await createRecord(db, userId, record);
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['records', userId],
            });
            onSuccess(variables);
        },
        onError,
    });

    return {
        createRecord: async (record: MedicationRecord) =>
            await createRecordMutation.mutateAsync(record),
    };
};
