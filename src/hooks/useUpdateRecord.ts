import { MedicationRecord } from '../model/MedicationRecord';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecord } from '../services/records';

interface UseUpdateRecordReturn {
    updateRecord: () => void;
}

export const useUpdateRecord = (
    token: string,
    record: MedicationRecord,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseUpdateRecordReturn => {
    const queryClient = useQueryClient();

    const updateRecordMutation = useMutation({
        mutationFn: async (record: MedicationRecord) => {
            return await updateRecord(token, record);
        },
        onSuccess,
        onError,
        onSettled: () => {
            console.log('onSettled');
            return queryClient.setQueryData(['record', '1'], record); // TODO: Replace the hardcoded id with the record id
        },
    });

    return {
        updateRecord: () => updateRecordMutation.mutate(record),
    };
};
