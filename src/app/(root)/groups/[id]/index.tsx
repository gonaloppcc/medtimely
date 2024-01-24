import * as React from 'react';

import { List, Portal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
    DestructiveButton,
    OutlineButton,
} from '../../../../components/Button';
import { ROUTE } from '../../../../model/routes';
import { useGroupById } from '../../../../hooks/useGroupById';
import { ProgressIndicator } from '../../../../components/ProgressIndicator';
import { Modal } from '../../../../components/Modal';
import { useDeleteGroup } from '../../../../hooks/useDeleteGroup';
import { useGroupOwnedMedications } from '../../../../hooks/useGroupOwnedMedications';
import { MedicationIcon } from '../../../../components/MedicationIcon';

export interface GroupCardProps {
    onPress: (id: string) => void;
}

const MAX_SHOWN_USERS = 5;

export default function GroupScreen() {
    const id = useLocalSearchParams().id as string;

    const { isSuccess, isLoading, isError, group } = useGroupById(id);

    // Group OwnedMedications
    const {
        isSuccess: isOwnedMedicationsSuccess,
        isLoading: isOwnedMedicationsLoading,
        isError: isOwnedMedicationsError,
        ownedMedications,
    } = useGroupOwnedMedications(id);

    //MODAl
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const onPressMembers = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    };

    const onSuccessGroup = () => {
        hideModal();
        router.push({ pathname: ROUTE.GROUPS.BASE_NAME });
    };

    const onErrorGroup = () => {};

    const { deleteGroup } = useDeleteGroup(onSuccessGroup, onErrorGroup);

    const deleteGroupHandler = async () => {
        if (group && group.id) await deleteGroup(group.id);
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
                                    .slice(0, MAX_SHOWN_USERS)
                                    .map((user, index) => (
                                        <List.Item
                                            key={index}
                                            title={`${user.firstName} ${user.lastName}`}
                                            left={() => (
                                                <List.Icon icon="account-circle" />
                                            )}
                                            style={styles.listItem}
                                        />
                                    ))}
                                {group.users.length > MAX_SHOWN_USERS && (
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

                        <View style={styles.titleAndButton}>
                            <Text variant="titleMedium">Owned Medications</Text>
                            <OutlineButton>See all</OutlineButton>
                        </View>
                        {isOwnedMedicationsLoading && <ProgressIndicator />}
                        {isOwnedMedicationsError && (
                            <Text>Something went wrong</Text>
                        )}
                        {isOwnedMedicationsSuccess && (
                            <View style={styles.groupContainer}>
                                <List.Section style={styles.listGroup}>
                                    {ownedMedications.map(
                                        (medication, index) => (
                                            <List.Item
                                                key={index}
                                                title={medication.name}
                                                left={() => (
                                                    <MedicationIcon
                                                        form={medication.form}
                                                    />
                                                )}
                                                style={styles.listItem}
                                            />
                                        )
                                    )}
                                </List.Section>
                            </View>
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
        padding: 5,
        gap: 10,
    },
    listItem: {
        padding: 5,
    },
});
