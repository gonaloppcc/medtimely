import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebase';
import { updateOwnedMedicationStock } from '../services/ownedMedication';

interface useUpdateStockHandlerReturn {
    updateStock: (ownedMedicationId: string, stock: number) => Promise<void>;
}

export const useUpdateStock = (
    uid: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): useUpdateStockHandlerReturn => {
    const queryClient = useQueryClient();
    const updateStockMutation = useMutation({
        mutationFn: async ({
            ownedMedicationId,
            stock,
        }: {
            ownedMedicationId: string;
            stock: number;
        }) => {
            await updateOwnedMedicationStock(db, uid, ownedMedicationId, stock);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['ownedMedications', uid],
            });
            onSuccess();
        },
        onError,
    });

    return {
        updateStock: async (ownedMedicationId: string, stock: number) =>
            await updateStockMutation.mutateAsync({ ownedMedicationId, stock }),
    };
};
