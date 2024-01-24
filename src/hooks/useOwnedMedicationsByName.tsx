import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getUserOwnedMedications } from '../services/ownedMedication';
import { OwnedMedication } from '../model/ownedMedication';
import { db } from '../firebase';

export interface useOwnedMedicationsProps extends FetcherProps {
    ownedMedications: OwnedMedication[];
}

export const useOwnedMedicationsByName = (
    userId: string,
    name: string
): useOwnedMedicationsProps => {
    console.log(name);

    const {
        isSuccess,
        isLoading,
        isError,
        data: ownedMedications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['ownedMedication', userId],
        //TODO: Mudar isto
        // queryFn: () => getUserOwnedMedicationsByName(db, userId, name),
        queryFn: () => getUserOwnedMedications(db, userId),
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
