import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../hooks/useNavOptions';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../model/routes';
import { GroupMembers } from '../../../../components/GroupMembers';

// TODO: This is just for now, it should be replaced with data from the database
const MEMBERS_INFO = {
    name:"name"
};

//export interface GroupCardProps {
//    onPress: (id: string) => void;
//}

export default function GroupScreen({onPress}) {
    const id = useLocalSearchParams().id || '';
    const { name } = MEMBERS_INFO;

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            //onPress={() => navigation.navigate('EditRecord')}
        />
    );

    useNavOptions({
        headerTitle: name,
        headerRight,
    });

    //const onPressMembers = () => {
    //    router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    //};

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge">Hello!</Text>
            <GroupMembers members={name} />
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