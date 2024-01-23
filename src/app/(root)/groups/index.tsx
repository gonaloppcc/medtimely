import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { GroupCards } from '../../../components/GroupCards';
import { useGroups } from '../../../hooks/useGroups';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { router } from 'expo-router';
import { ROUTE } from '../../../model/routes';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useNavOptions } from '../../../hooks/useNavOptions';

export default function GroupsScreen() {
    const { user } = useAuthentication();

    const headerRight = () => (
        <Appbar.Action
            icon="plus"
            onPress={() =>
                router.push({
                    pathname: ROUTE.GROUPS.ADD,
                })
            }
        />
    );

    useNavOptions({
        headerRight,
    });

    const { isSuccess, isLoading, isError, groups, refetch } = useGroups(
        user?.uid ?? ''
    );

    const onPressGroup = (id: string) => {
        router.push({ pathname: ROUTE.GROUPS.BY_ID, params: { id } });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Your Groups</Text>
            {isError && <Text>Something went wrong</Text>}
            {isLoading && <ProgressIndicator />}
            {isSuccess && groups.length > 0 && (
                <GroupCards
                    groups={groups}
                    onPressGroup={onPressGroup}
                    isRefreshing={isLoading}
                    onRefresh={refetch}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingBottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
