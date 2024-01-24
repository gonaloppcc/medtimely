import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupData } from '../model/group';
import { createGroup } from '../services/groups';
import { db } from '../firebase';
import { PlannedMedication } from '../model/ownedMedication';
import { createPlannedMedication } from '../services/plannedMedication/plannedMedication';

interface UseCreatePlannedMedicationReturn {
    createPlannedMedication: (
        plannedMedication: Omit<PlannedMedication, 'ownedMedication'>,
        ownedMedication: string
    ) => Promise<void>;
}

export const useCreatePlannedMedication = (
    userId: string,
    onSuccess: () => void,
    onError: (error: Error) => void
): UseCreatePlannedMedicationReturn => {
    const queryClient = useQueryClient();
    const createGroupMutation = useMutation({
        mutationFn: async ({
            plannedMedication,
            ownedMedication,
        }: {
            plannedMedication: Omit<PlannedMedication, 'ownedMedication'>;
            ownedMedication: string;
        }) => {
            return await createPlannedMedication(
                db,
                userId,
                plannedMedication,
                ownedMedication
            );
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['ownedMedication', userId],
            });
            onSuccess();
        },
        onError,
    });

    return {
        createPlannedMedication: async (
            plannedMedication: Omit<PlannedMedication, 'ownedMedication'>,
            ownedMedication: string
        ) =>
            await createGroupMutation.mutateAsync({
                plannedMedication,
                ownedMedication,
            }),
    };
};
