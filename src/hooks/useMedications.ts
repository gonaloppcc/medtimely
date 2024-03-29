import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getMedications } from '../services/medications';
import { Medication } from '../model/medication';
import { Firestore } from 'firebase/firestore';

export interface useMedicationsProps extends FetcherProps {
    medications: Medication[];
}

export const useMedications = (
    db: Firestore,
    maxDocuments: number = 10
): useMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: medications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['medications'], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getMedications(db, maxDocuments),
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
