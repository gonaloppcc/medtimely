import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { PlannedMedication } from '../model/ownedMedication';
import { getPlannedMedicationById } from '../services/plannedMedication/plannedMedication';
import { db } from '../firebase';

export interface usePlannedMedicationsByIdProps extends FetcherProps {
    medication: PlannedMedication;
}

export const usePlannedMedicationsById = (
    userId: string,
    medicationId: string
): usePlannedMedicationsByIdProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: medications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['plannedMedicationsById'],
        queryFn: () => getPlannedMedicationById(db, userId, medicationId),
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
