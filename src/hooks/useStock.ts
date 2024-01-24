import { useQuery } from '@tanstack/react-query';
import { OwnedMedication } from '../model/ownedMedication';
import { AxiosError } from 'axios';
import { db } from '../firebase';
import { FetcherProps } from './Fetcher';
import {
    getGroupOwnedMedications,
    getUserOwnedMedications,
} from '../services/ownedMedication';

const PERSONAL_VALUE = 'Personal';

export interface useStockProps extends FetcherProps {
    ownedMedications: OwnedMedication[];
}

export const useStock = (
    userId: string,
    stockFilter: string
): useStockProps => {
    const isPersonal = stockFilter === PERSONAL_VALUE;

    const {
        isSuccess,
        isLoading,
        isError,
        data: ownedMedications,
        error,
        refetch,
    } = useQuery(
        isPersonal
            ? {
                  queryKey: ['ownedMedications', userId],
                  queryFn: () => getUserOwnedMedications(db, userId),
              }
            : {
                  queryKey: ['ownedMedications', userId, stockFilter],
                  queryFn: () => getGroupOwnedMedications(db, stockFilter),
              }
    );

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
