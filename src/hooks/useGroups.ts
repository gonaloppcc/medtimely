import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Group } from '../model/group';
import { getGroups } from '../services/groups';

export interface useGroupsProps extends FetcherProps {
    groups: Group[];
}

export const useGroups = (token: string): useGroupsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: groups,
        error,
        refetch,
    } = useQuery({
        queryKey: ['groups'], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getGroups(token),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        groups: (groups || []) as unknown as Group[],
        error: error as AxiosError,
        refetch,
    };
};
