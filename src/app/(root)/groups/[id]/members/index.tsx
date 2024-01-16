import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../../hooks/useNavOptions';
import { useLocalSearchParams } from 'expo-router';
import { GroupMembers } from '../../../../../components/GroupMembers';
import { router } from 'expo-router';
import { ROUTE } from '../../../../../model/routes';

// TODO: This is just for now, it should be replaced with data from the database
const MEMBERS_INFO = [
    {
    id: "test",
    name:"name",
    sharedMeds: ["testMed1", "testMed2", "testMed3"],
    hasSharedStock: false,
    },
    {
    id: "test2",
    name: "name2",
    sharedMeds: ["testMed4", "testMed5", "testMed6"],
    hasSharedStock: false,
    }
];

//export interface GroupCardProps {
//    onPress: (id: string) => void;
//}

export default function GroupMembersScreen() {
    const id = useLocalSearchParams().id || '';
    const groupMembers = MEMBERS_INFO;

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            //onPress={() => navigation.navigate('EditRecord')}
        />
    );

    useNavOptions({
        headerTitle: "Members",
        headerRight,
    });

    const onPressGroupMember = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBER, params: {id: "testId", memberId: "test"} });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge">Group Members</Text>
            <GroupMembers groupMembers={groupMembers} onPressGroupMember={onPressGroupMember} />
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