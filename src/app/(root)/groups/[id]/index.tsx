import * as React from 'react';

import { Appbar, List, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { OutlineButton } from '../../../../components/Button';
import { ROUTE } from '../../../../model/routes';
import { useNavOptions } from '../../../../hooks/useNavOptions';
import { useGroupById } from '../../../../hooks/useGroupById';
import { ProgressIndicator } from '../../../../components/ProgressIndicator';

export interface GroupCardProps {
    onPress: (id: string) => void;
}

export default function GroupScreen() {
    const id = useLocalSearchParams().id as string;

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            onPress={() =>
                router.push({
                    pathname: ROUTE.GROUPS.EDIT,
                    params: { id },
                })
            }
        />
    );

    useNavOptions({
        headerTitle: 'Members',
        headerRight,
    });

    const { isSuccess, isLoading, isError, group } = useGroupById(id);

    const onPressMembers = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    };

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && group && (
                <>
                    <View style={styles.titleContainer}>
                        <Text variant="headlineMedium">{group.name}</Text>
                        <Text variant="labelMedium">{group.description}</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <Text variant="titleMedium">
                            {group.sharedMeds.length} shared medications
                        </Text>

                        <View style={styles.groupContainer}>
                            <View style={styles.groupTitle}>
                                <Text variant="titleMedium">
                                    {group.users.length} Members
                                </Text>

                                <OutlineButton onPress={onPressMembers}>
                                    See all
                                </OutlineButton>
                            </View>
                            <List.Section style={styles.listGroup}>
                                {group.users.slice(0, 5).map((user, index) => (
                                    <List.Item
                                        key={index}
                                        title={`${user.firstname} ${user.lastname}`}
                                        left={() => (
                                            <List.Icon icon="account-circle" />
                                        )}
                                        style={styles.listItem}
                                    />
                                ))}
                            </List.Section>
                        </View>

                        {group.hasSharedStock && (
                            <Text variant="titleMedium">
                                The group has shared stock.
                            </Text>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 12,
        gap: 26,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    titleContainer: {
        display: 'flex',
        gap: 4,
    },
    bodyContainer: {
        display: 'flex',
        gap: 8,
    },
    groupContainer: {
        display: 'flex',
        gap: 0,
    },
    groupTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listGroup: {
        padding: 10,
        gap: 10,
    },
    listItem: {
        paddingBottom: 0,
        paddingTop: 0,
    },
});
