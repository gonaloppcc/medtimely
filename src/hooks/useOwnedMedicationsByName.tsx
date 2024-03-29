import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getOwnedMedicationsByName } from '../services/ownedMedication';
import { OwnedMedication } from '../model/ownedMedication';
import { db } from '../firebase';

export interface useOwnedMedicationsProps extends FetcherProps {
    ownedMedications: OwnedMedication[];
}

export const useOwnedMedicationsByName = (
    userId: string,
    name: string,
    groupId?: string
): useOwnedMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: ownedMedications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['ownedMedicationByName', name, groupId ?? ''],
        queryFn: () => getOwnedMedicationsByName(db, userId, name, groupId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        ownedMedications: (ownedMedications ||
            []) as unknown as OwnedMedication[],
        error: error as AxiosError,
        refetch,
    };
};
