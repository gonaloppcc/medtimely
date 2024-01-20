import * as React from 'react';

import { FAB, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { GroupCards } from '../../../components/GroupCards';
import { useGroups } from '../../../hooks/useGroups';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { Link, router } from 'expo-router';
import { ROUTE } from '../../../model/routes';
import { useAuthentication } from '../../../hooks/useAuthentication';

export default function GroupsScreen() {
    const { user } = useAuthentication();
    const { isSuccess, isLoading, groups } = useGroups(user?.uid ?? '');

    const onPressGroup = (id: string) => {
        router.push({ pathname: ROUTE.GROUPS.BY_ID, params: { id } });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Your Groups</Text>
            {isLoading && <ProgressIndicator />}
            {isSuccess && (
                <GroupCards groups={groups} onPressGroup={onPressGroup} />
            )}
            <Link asChild href="/groups/add">
                <FAB icon="plus" style={styles.fab} />
            </Link>
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
