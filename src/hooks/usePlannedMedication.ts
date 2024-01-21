import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Firestore } from 'firebase/firestore';
import { PlannedMedication } from '../model/ownedMedication';
import { getPlannedMedications } from '../services/plannedMedication/plannedMedication';

export interface usePlannedMedicationsProps extends FetcherProps {
    medications: PlannedMedication[];
}

export const usePlannedMedications = (
    db: Firestore,
    userId: string
): usePlannedMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: medications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['plannedMedications'],
        queryFn: () => getPlannedMedications(db, userId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        medications: (medications || []) as unknown as PlannedMedication[],
        error: error as AxiosError,
        refetch,
    };
};
