import { AxiosError } from 'axios';
import { MedicationRecord } from '../model/MedicationRecord';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getRecord } from '../services/records';

export interface useRecordProps extends FetcherProps {
    record: MedicationRecord | null;
}

export const useRecord = (token: string, id: string): useRecordProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: record,
        error,
        refetch,
    } = useQuery({
        queryKey: ['record', id], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getRecord(token, id),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        record: (record || null) as MedicationRecord | null,
        error: error as AxiosError,
        refetch,
    };
};
