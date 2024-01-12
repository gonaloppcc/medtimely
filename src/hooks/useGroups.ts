import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Group } from '../model/group';
import { getUserGroups } from '../services/groups';
import { db } from '../firebase';

export interface useGroupsProps extends FetcherProps {
    groups: Group[];
}

export const useGroups = (userId: string): useGroupsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: groups,
        error,
        refetch,
    } = useQuery({
        queryKey: ['groups'], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getUserGroups(db, userId),
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
