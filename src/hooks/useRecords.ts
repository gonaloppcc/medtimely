import { AxiosError } from 'axios';
import { MedicationRecord } from '../model/medicationRecord';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getRecords } from '../services/records';
import { db } from '../firebase';

export interface useRecordsProps extends FetcherProps {
    records: MedicationRecord[];
}

export const useRecords = (userId: string, date: Date): useRecordsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: records,
        error,
        refetch,
    } = useQuery({
        queryKey: ['records', date, userId],
        queryFn: () => getRecords(db, userId, date),
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
