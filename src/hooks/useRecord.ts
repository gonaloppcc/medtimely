import { AxiosError } from 'axios';
import { MedicationRecord } from '../model/MedicationRecord';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getRecord } from '../services/records';

export interface useRecordProps extends FetcherProps {
    record: MedicationRecord | null;
}

export const useRecord = (recordId: string, userId: string): useRecordProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: record,
        error,
        refetch,
    } = useQuery({
        queryKey: ['record', recordId],
        queryFn: () => getRecord(recordId, userId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        record: (record || null) as MedicationRecord,
        error: error as AxiosError,
        refetch,
    };
};
