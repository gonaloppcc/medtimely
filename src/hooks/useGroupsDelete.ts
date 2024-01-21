import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { deleteGroup } from '../services/groups';
import { db } from '../firebase';
export interface useGroupsProps extends FetcherProps {}

export const useGroupsDelete = (groupId: string): useGroupsProps => {
    const { isSuccess, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['groupsDelete'],
        queryFn: () => deleteGroup(db, groupId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        error: error as AxiosError,
        refetch,
    };
};
