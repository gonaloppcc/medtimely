import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getMedications } from '../services/medications';
import { PersonalMedication } from '../model/Medicine';

export interface useMedicationsProps extends FetcherProps {
    medications: PersonalMedication[];
}

export const useMedications = (token: string): useMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: medications,
        error,
        refetch,
    } = useQuery({
        queryKey: ['medications'], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getMedications(token),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        medications: (medications || []) as unknown as PersonalMedication[],
        error: error as AxiosError,
        refetch,
    };
};
