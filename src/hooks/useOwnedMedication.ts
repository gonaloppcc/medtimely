import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getOwnedMedication } from '../services/ownedMedication';
import { OwnedMedication } from '../model/ownedMedication';
import { db } from '../firebase';

export interface useOwnedMedicationProps extends FetcherProps {
    ownedMedication: OwnedMedication;
}

export const useOwnedMedication = (
    ownedMedicationId?: string
): useOwnedMedicationProps => {
    // const docId = getOwnedMedicationPath({
    //     userId,
    //     groupId,
    //     ownedMedicationId: ownedMedicationId || '',
    // });
    const docId = ownedMedicationId;

    const {
        isSuccess,
        isLoading,
        isError,
        data: ownedMedication,
        error,
        refetch,
    } = useQuery({
        queryKey: ['ownedMedication', docId],
        queryFn: () => {
            if (docId) return getOwnedMedication(db, docId);
            return undefined;
        },
    });

    return {
        isSuccess,
        isLoading,
        isError,
        ownedMedication: ownedMedication as unknown as OwnedMedication,
        error: error as AxiosError,
        refetch,
    };
};
