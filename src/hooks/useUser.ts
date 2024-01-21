import { AxiosError } from 'axios';
import { FetcherProps } from './Fetcher';
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase';
import { User } from '../model/user';
import { getUserDoc } from '../services/users';

export interface useUserProps extends FetcherProps {
    userDoc: User | null;
}

export const useUser = (userId: string): useUserProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: user,
        error,
        refetch,
    } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserDoc(db, userId),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        userDoc: (user || null) as User,
        error: error as AxiosError,
        refetch,
    };
};
