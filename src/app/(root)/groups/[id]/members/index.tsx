import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../../hooks/useNavOptions';
import { GroupMembers } from '../../../../../components/GroupMembers';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../../model/routes';
import { ProgressIndicator } from '../../../../../components/ProgressIndicator';
import { useGroupById } from '../../../../../hooks/useGroupById';

export default function GroupMembersScreen() {
    const groupId = useLocalSearchParams().id as string;
    const { isSuccess, isLoading, isError, group } = useGroupById(groupId);

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            //onPress={() => navigation.navigate('EditRecord')}
        />
    );

    useNavOptions({
        headerTitle: 'Members',
        headerRight,
    });

    const onPressGroupMember = (id: string) => {
        if (id !== null)
            router.push({
                pathname: ROUTE.GROUPS.MEMBER,
                params: { id: groupId, memberId: id },
            });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge">Group Members</Text>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && group && (
                <GroupMembers
                    groupMembers={group.users}
                    onPressGroupMember={onPressGroupMember}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
