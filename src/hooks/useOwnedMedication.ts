import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getOwnedMedication } from '../services/ownedMedication';
import { OwnedMedication } from '../model/ownedMedication';
import { db } from '../firebase';

export interface useOwnedMedicationProps extends FetcherProps {
    ownedMedication: OwnedMedication | null;
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
        queryKey: ['ownedMedication', docId || ''],
        queryFn: async () => {
            if (docId && docId != '')
                return await getOwnedMedication(db, docId);
            return null;
        },
    });

    return {
        isSuccess,
        isLoading,
        isError,
        ownedMedication: ownedMedication as unknown as OwnedMedication | null,
        error: error as AxiosError,
        refetch,
    };
};
