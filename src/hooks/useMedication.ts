import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Medication } from '../model/medication';
import { getMedication } from '../services/medications';

export interface useMedicationsProps extends FetcherProps {
    medication: Medication | null;
}

export const useMedication = (
    medicationId: string,
    userId: string
): useMedicationsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: record,
        error,
        refetch,
    } = useQuery({
        queryKey: ['medication', medicationId],
        queryFn: () => getMedication(medicationId, userId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        medication: (record || null) as Medication,
        error: error as AxiosError,
        refetch,
    };
};
