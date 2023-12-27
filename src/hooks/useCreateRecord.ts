import { MedicationRecord } from '../model/MedicationRecord';
import { useMutation } from '@tanstack/react-query';
import { createRecord } from '../services/records';

interface UseCreateRecordReturn {
    createRecord: (record: MedicationRecord) => Promise<string>;
}

export const useCreateRecord = (
    token: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseCreateRecordReturn => {
    const createRecordMutation = useMutation({
        mutationFn: async (record: MedicationRecord) => {
            return await createRecord(token, record);
        },
        onSuccess,
        onError,
    });

    return {
        createRecord: async (record: MedicationRecord) =>
            await createRecordMutation.mutateAsync(record),
    };
};
