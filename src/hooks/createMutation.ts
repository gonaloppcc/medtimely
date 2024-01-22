import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createMutation = <T1, T2 = void>(
    cacheKey: string,
    mutationFn: (data: T1) => Promise<T2>,
    onSuccess: (data: T1) => void,
    onError: (error: Error) => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: [cacheKey, variables],
            });
            onSuccess(variables);
        },
        onError,
    });
};
