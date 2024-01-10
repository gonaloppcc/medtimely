import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Stock } from '../model/stock';
import { getStock } from '../services/stock';

export interface useStockProps extends FetcherProps {
    stock: Stock;
}

export const useStock = (userId: string): useStockProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: record,
        error,
        refetch,
    } = useQuery({
        queryKey: ['stock'],
        queryFn: () => getStock(userId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        stock: (record || []) as Stock,
        error: error as AxiosError,
        refetch,
    };
};
