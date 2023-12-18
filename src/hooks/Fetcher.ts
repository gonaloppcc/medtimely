import {AxiosError} from 'axios';

export interface FetcherProps {
    limit?: number;
    offset?: number;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    error: AxiosError;
    refetch: () => void;
}
