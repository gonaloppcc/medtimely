import { AxiosError } from 'axios';
import { MedicationRecord } from '../model/MedicationRecord';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getRecords } from '../services/records';

export interface useBetsProps extends FetcherProps {
    records: MedicationRecord[];
}

export const useRecords = (token: string, date: Date): useBetsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: records,
        error,
        refetch,
    } = useQuery({
        queryKey: ['records', date], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getRecords(token, date),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        records: (records || []) as unknown as MedicationRecord[],
        error: error as AxiosError,
        refetch,
    };
};
