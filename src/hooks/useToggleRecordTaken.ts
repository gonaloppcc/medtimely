import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleRecordTake } from '../services/records';
import { db } from '../firebase';
import { MedicationRecord, RecordState } from '../model/medicationRecord';

interface UseToggleRecordTakeReturn {
    toggleRecordTake: (record: MedicationRecord) => Promise<RecordState>;
}

export const useToggleRecordTake = (
    userId: string,
    date: Date,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseToggleRecordTakeReturn => {
    const queryClient = useQueryClient();
    const toggleRecordTakeMutation = useMutation({
        mutationFn: async (record: MedicationRecord) => {
            return await toggleRecordTake(db, userId, record);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['records', date, userId],
            });
            onSuccess();
        },
        onError,
    });

    return {
        toggleRecordTake: async (record: MedicationRecord) =>
            await toggleRecordTakeMutation.mutateAsync(record),
    };
};
