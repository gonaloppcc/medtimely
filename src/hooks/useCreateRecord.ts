import { MedicationRecord } from '../model/medicationRecord';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecord } from '../services/records';
import { db } from '../firebase';
import { createMutation } from './createMutation';

interface UseCreateRecordReturn {
    createRecord: (record: MedicationRecord) => Promise<string>;
}

export const useCreateRecord = (
    userId: string,
    onSuccess: (record: MedicationRecord) => void,
    onError: (error: Error) => void
): UseCreateRecordReturn => {
    const createRecordMutation = createMutation<MedicationRecord, string>(
        'records',
        async (record: MedicationRecord): Promise<string> => {
            return await createRecord(db, userId, record);
        },
        onSuccess,
        onError
    );

    return {
        createRecord: async (record: MedicationRecord) =>
            await createRecordMutation.mutateAsync(record),
    };
};
