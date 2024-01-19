import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { PrimaryButton } from '../../../../components/Button';
import { ROUTE } from '../../../../model/routes';
import { useNavOptions } from '../../../../hooks/useNavOptions';

// TODO: This is just for now, it should be replaced with data from the database
const GROUP_INFO = {
    groupName: 'name',
    description: 'descr',
    sharedMeds: ['test1', 'test2', 'test3'],
    treatmentPermission: 'manage',
    hasSharedStock: false,
};

export interface GroupCardProps {
    onPress: (id: string) => void;
}

export default function GroupScreen() {
    const id = useLocalSearchParams().id || '';
    const {
        groupName,
        description,
        sharedMeds,
        treatmentPermission,
        hasSharedStock,
    } = GROUP_INFO;

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

    const onPressMembers = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">{groupName}</Text>
            <Text variant="labelMedium">{description}</Text>
            <Text variant="labelMedium">{sharedMeds}</Text>
            <Text variant="labelMedium">{treatmentPermission}</Text>
            <Text variant="labelMedium">{hasSharedStock}</Text>
            <PrimaryButton onPress={onPressMembers}>
                See group members{' '}
            </PrimaryButton>
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
