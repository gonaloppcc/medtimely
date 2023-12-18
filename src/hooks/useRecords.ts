import { AxiosError } from 'axios';
import { MedicationRecord } from '../model/MedicationRecord';
import { FetcherProps } from './Fetcher';
import { useQuery } from 'react-query';
import { getRecords } from '../services/records';

export interface useBetsProps extends FetcherProps {
    records: MedicationRecord[];
}

export const useRecords = (token: string): useBetsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: records,
        error,
        refetch,
    } = useQuery(['records'], () => getRecords(token)); // No need to add the token in the query key since all requests will have the same token

    return {
        isSuccess,
        isLoading,
        isError,
        records: (records || []) as unknown as MedicationRecord[],
        error: error as AxiosError,
        refetch,
    };
};
