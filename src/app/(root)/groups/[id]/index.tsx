import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../../../components/Button';
import { ROUTE } from '../../../../model/routes';

// TODO: This is just for now, it should be replaced with data from the database
const GROUP_INFO = {
    groupName: 'name',
    description: 'descr'
};

export interface GroupCardProps {
    onPress: (id: string) => void;
}

export default function GroupScreen({onPress}) {
    const id = useLocalSearchParams().id || '';
    const { groupName, description } = GROUP_INFO;

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            //onPress={() => navigation.navigate('EditRecord')}
        />
    );
    

    const onPressMembers = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">{groupName}</Text>
            <Text variant="labelMedium">{description}</Text>
            <Button onPress={onPressMembers}>See group members </Button>
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