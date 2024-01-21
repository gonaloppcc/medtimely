import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Medication } from '../model/medication';
import { getMedication } from '../services/medications';
import { db } from '../firebase';

export interface useMedicationProps extends FetcherProps {
    medication: Medication | null;
}

export const useMedication = (medicationId?: string): useMedicationProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: record,
        error,
        refetch,
    } = useQuery({
        queryKey: ['medication', medicationId],
        queryFn: async () => {
            if (medicationId) return await getMedication(db, medicationId);
            return null;
        },
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
