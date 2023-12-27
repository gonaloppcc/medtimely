import { MedicationRecord } from '../model/MedicationRecord';
import { useMutation } from '@tanstack/react-query';
import { createRecord } from '../services/records';

interface UseCreateRecordReturn {
    createRecord: () => void;
}

export const useCreateRecord = (
    token: string,
    record: MedicationRecord,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseCreateRecordReturn => {
    const createRecordMutation = useMutation({
        mutationFn: async () => {
            await createRecord(token, record);
        },
        onSuccess,
        onError,
    });

    return {
        createRecord: () => createRecordMutation.mutate(),
    };
};
