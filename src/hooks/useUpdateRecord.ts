import { MedicationRecord } from '../model/medicationRecord';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecord } from '../services/records';
import { db } from '../firebase';

interface UseUpdateRecordReturn {
    updateRecord: (record: MedicationRecord) => void;
}

export const useUpdateRecord = (
    userId: string,
    recordId: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseUpdateRecordReturn => {
    const queryClient = useQueryClient();

    const updateRecordMutation = useMutation({
        mutationFn: async (record: MedicationRecord) => {
            await updateRecord(db, userId, recordId, record);
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData(['record', recordId], variables);
            onSuccess();
        },
        onError,
    });

    return {
        updateRecord: (record: MedicationRecord) =>
            updateRecordMutation.mutate(record),
    };
};
