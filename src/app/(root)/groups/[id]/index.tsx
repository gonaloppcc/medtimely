import * as React from 'react';

import { Appbar, List, Portal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
    DestructiveButton,
    OutlineButton,
} from '../../../../components/Button';
import { ROUTE } from '../../../../model/routes';
import { useNavOptions } from '../../../../hooks/useNavOptions';
import { useGroupById } from '../../../../hooks/useGroupById';
import { ProgressIndicator } from '../../../../components/ProgressIndicator';
import { Modal } from '../../../../components/Modal';

export interface GroupCardProps {
    onPress: (id: string) => void;
}

export default function GroupScreen() {
    const id = useLocalSearchParams().id as string;
    const SHOW_USERS = 5;

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

    const { isSuccess, isLoading, isError, group } = useGroupById(id);

    //MODAl
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useNavOptions({
        headerRight,
    });

    const onPressMembers = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    };

    const deleteGroupHandler = async () => {
        //TODO: Call function
        //TODO: Add error msg
    };

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && group && (
                <>
                    <Portal>
                        <Modal
                            visible={visible}
                            onDismiss={hideModal}
                            onDone={deleteGroupHandler}
                            title="Delete Group"
                        >
                            <Text variant="bodyMedium">
                                Are you sure you want delete group: {group.name}
                                ?
                            </Text>
                        </Modal>
                    </Portal>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleAndButton}>
                            <Text variant="headlineMedium">{group.name}</Text>
                            <DestructiveButton onPress={showModal}>
                                Delete
                            </DestructiveButton>
                        </View>
                        <Text variant="labelMedium">{group.description}</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <Text variant="titleMedium">
                            {group.sharedMeds.length} shared medications
                        </Text>

                        <View style={styles.groupContainer}>
                            <View style={styles.titleAndButton}>
                                <Text variant="titleMedium">
                                    {group.users.length} Members
                                </Text>

                                <OutlineButton onPress={onPressMembers}>
                                    See all
                                </OutlineButton>
                            </View>
                            <List.Section style={styles.listGroup}>
                                {group.users
                                    .slice(0, SHOW_USERS)
                                    .map((user, index) => (
                                        <List.Item
                                            key={index}
                                            title={`${user.firstname} ${user.lastname}`}
                                            left={() => (
                                                <List.Icon icon="account-circle" />
                                            )}
                                            style={styles.listItem}
                                        />
                                    ))}
                                {group.users.length > SHOW_USERS && (
                                    <List.Item
                                        key="others"
                                        title={'...'}
                                        left={() => (
                                            <List.Icon icon="account-circle" />
                                        )}
                                        style={styles.listItem}
                                    />
                                )}
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
    titleAndButton: {
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
