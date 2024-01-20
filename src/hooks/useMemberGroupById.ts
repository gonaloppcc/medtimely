import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { getMemberGroupById } from '../services/groups';
import { db } from '../firebase';
import { User } from '../model/user';
export interface useMemberGroupByIdProps extends FetcherProps {
    user: User;
}

export const useMemberGroupById = (
    groupId: string,
    memberId: string
): useMemberGroupByIdProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: user,
        error,
        refetch,
    } = useQuery({
        queryKey: ['memberGroupById'],
        queryFn: () => getMemberGroupById(db, groupId, memberId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        user: (user || null) as unknown as User,
        error: error as AxiosError,
        refetch,
    };
};
