import { FetcherProps } from './Fetcher';
import { OwnedMedication } from '../model/ownedMedication';
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase';
import { AxiosError } from 'axios';
import { getGroupOwnedMedications } from '../services/ownedMedication';

interface UseGetGroupOwnedMedicationsProps extends FetcherProps {
    ownedMedications: OwnedMedication[];
}

export const useGroupOwnedMedications = (
    groupId: string
): UseGetGroupOwnedMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: ownedMedications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['ownedMedications', groupId],
        queryFn: () => getGroupOwnedMedications(db, groupId),
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
