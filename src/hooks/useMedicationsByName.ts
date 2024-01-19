import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getMedicationsByNameSubstring } from '../services/medications';
import { Medication } from '../model/medication';
import { db } from '../firebase';

export interface useMedicationsProps extends FetcherProps {
    medications: Medication[];
}

export const useMedicationsByName = (search: string): useMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: medications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['medicationsByName', search], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getMedicationsByNameSubstring(db, search),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        medications: (medications || []) as unknown as Medication[],
        error: error as AxiosError,
        refetch,
    };
};
