import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { Group } from '../model/group';
import { getGroupById } from '../services/groups';
import { db } from '../firebase';
export interface useGroupsProps extends FetcherProps {
    group: Group;
}

export const useGroupById = (groupId: string): useGroupsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: group,
        error,
        refetch,
    } = useQuery({
        queryKey: ['groupById'], // No need to add the token in the query key since all requests will have the same token
        queryFn: () => getGroupById(db, groupId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        group: (group || null) as unknown as Group,
        error: error as AxiosError,
        refetch,
    };
};
