import { MedicationRecord } from '../model/MedicationRecord';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecord } from '../services/records';

interface UseUpdateRecordReturn {
    updateRecord: (record: MedicationRecord) => void;
}

export const useUpdateRecord = (
    token: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseUpdateRecordReturn => {
    const queryClient = useQueryClient();

    const updateRecordMutation = useMutation({
        mutationFn: async (record: MedicationRecord) => {
            return await updateRecord(token, record);
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(['record', '1'], variables); // TODO: Replace the hardcoded id with the record id
            onSuccess();
        },
        onError,
    });

    return {
        updateRecord: (record: MedicationRecord) =>
            updateRecordMutation.mutate(record),
    };
};
