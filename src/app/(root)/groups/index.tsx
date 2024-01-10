import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { GroupCards } from '../../../components/GroupCards';
import { useGroups } from '../../../hooks/useGroups';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { router } from 'expo-router';
import { ROUTE } from '../../../model/routes';

export default function GroupsScreen() {
    const { isSuccess, isLoading, groups } = useGroups('1'); // TODO: Replace with user's token

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
});
