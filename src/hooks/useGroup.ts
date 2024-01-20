import { useQuery } from '@tanstack/react-query';
import { Group } from '../model/group';
import { FetcherProps } from './Fetcher';
import { getGroup } from '../services/groups';
import { db } from '../firebase';
import { AxiosError } from 'axios';

interface useGroupProps extends FetcherProps {
    group: Group;
}

export const useGroup = (groupId: string): useGroupProps => {
    const result = useQuery({
        queryKey: ['group', groupId],
        queryFn: () => getGroup(db, groupId),
    });

    return {
        ...result,
        error: result.error as AxiosError,
        group: result.data as unknown as Group,
    };
};
