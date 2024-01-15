import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getUserGroupOwnedMedications } from '../services/ownedMedication';
import { OwnedMedication } from '../model/ownedMedication';
import { db } from '../firebase';

export interface useGroupOwnedMedicationsProps extends FetcherProps {
    ownedMedications: OwnedMedication[];
}

export const useGroupOwnedMedications = (
    userId: string,
    groupId: string
): useGroupOwnedMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: ownedMedications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['groupOwnedMedication', userId],
        queryFn: () => getUserGroupOwnedMedications(db, userId, groupId),
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
