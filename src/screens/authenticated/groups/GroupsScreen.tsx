import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { GroupCards } from '../../../components/GroupCards';
import { useGroups } from '../../../hooks/useGroups';
import { ProgressIndicator } from '../../../components/ProgressIndicator';

export function GroupsScreen() {
    
    const { isSuccess, isLoading, isError, groups } = useGroups('1'); // TODO: Replace with user's token
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Your Groups</Text>
            {isLoading && <ProgressIndicator />}
            {isSuccess && (
                <GroupCards groups={groups}/>
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
