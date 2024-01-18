import { AxiosError } from 'axios';
import { MedicationRecord } from '../model/medicationRecord';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getRecordsByMedication } from '../services/records';
import { db } from '../firebase';

export interface useRecordsProps extends FetcherProps {
    records: MedicationRecord[];
}

export const useRecordsByMedication = (
    userId: string,
    medicationId: string,
    maxRecords: number = 10
): useRecordsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: records,
        error,
        refetch,
    } = useQuery({
        queryKey: ['records', userId],
        queryFn: () =>
            getRecordsByMedication(db, userId, medicationId, maxRecords),
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
