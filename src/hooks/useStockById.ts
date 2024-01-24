import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { PlannedMedication } from '../model/ownedMedication';
import { getPlannedMedicationById } from '../services/plannedMedication/plannedMedication';
import { db } from '../firebase';
import { Medication } from '../model/medication';
import { getMedication } from '../services/medications';
import { getUserOwnedMedicationById } from '../services/ownedMedication';

export interface useStockMedByIdProps extends FetcherProps {
    medication: PlannedMedication;
}

export const useStockMedById = (
    userId: string,
    medicationId: string
): useStockMedByIdProps => {
    medicationId = "users/0f7SM5qSebcxWkHUc1Gi9jgELuE3/ownedMedications/" + medicationId;
    const {
        isSuccess,
        isLoading,
        isError,
        data: medications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['stockMedById'],
        queryFn: () => getUserOwnedMedicationById(db, userId, medicationId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        medication: medications as unknown as PlannedMedication,
        error: error as AxiosError,
        refetch,
    };
};
