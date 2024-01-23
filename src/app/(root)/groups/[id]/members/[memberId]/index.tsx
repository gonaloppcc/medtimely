import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../../../../../components/Button';
import { useNavOptions } from '../../../../../../hooks/useNavOptions';
import { WeekDayPicker } from '../../../../../../components/WeekDayPicker';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../../../model/routes';
import { useMemberGroupById } from '../../../../../../hooks/useMemberGroupById';
import { ProgressIndicator } from '../../../../../../components/ProgressIndicator';
import { Appbar, Portal, Text } from 'react-native-paper';
import { useRecords } from '../../../../../../hooks/useRecords';
import { RecordCards } from '../../../../../../components/RecordCards';
import { MedicationRecord } from '../../../../../../model/medicationRecord';
import { MedicationRecordModal } from '../../../../../../components/ModalMedicationRecord';
import { EmptyPlannedMedications } from '../../../../../../components/EmptyPlannedMedications';
import { useDeleteRecord } from '../../../../../../hooks/useDeleteRecord';
import { Modal } from '../../../../../../components/Modal';
import { useDeleteGroupMember } from '../../../../../../hooks/useDeleteGroupMember';
import { useToggleRecordTake } from '../../../../../../hooks/useToggleRecordTaken';

const startDay = new Date();

export default function GroupMemberScreen() {
    const localSearchParams = useLocalSearchParams();
    const groupId = localSearchParams.groupId as string;
    const memberId = localSearchParams.memberId as string;
    const { isSuccess, isLoading, isError, user } = useMemberGroupById(
        groupId,
        memberId
    );

    const day = (localSearchParams.day as string) || new Date().toISOString();
    const initialSelectedDay = new Date(day);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
    const {
        isSuccess: isSuccessRecord,
        isLoading: isLoadingRecord,
        isError: isErrorRecord,
        records,
        refetch,
    } = useRecords(memberId, selectedDay);

    const headerRight = () => (
        <Appbar.Action
            icon="delete"
            onPress={() => {
                showModalDeleteMember();
            }}
        />
    );

    useNavOptions({
        headerRight,
    });

    if (isSuccess && user) {
        useNavOptions({
            headerTitle: user.firstName,
        });
    }

    const onPressMemberRecord = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBER_MEDS });
    };

    const selectDay = (day: Date) => {
        setSelectedDay(day);
    };

    //MODAL
    const [visibleRecord, setVisibleRecord] = useState(false);
    const [visibleDeleteMemberModal, setVisibleDeleteMemberModal] =
        useState(false);
    const [recordModal, setRecordModal] = useState<MedicationRecord>();
    const showModalRecordInfo = () => setVisibleRecord(true);
    const hideModalRecordInfo = () => setVisibleRecord(false);

    const showModalDeleteMember = () => setVisibleDeleteMemberModal(true);
    const hideModalDeleteMember = () => setVisibleDeleteMemberModal(false);

    const onPressRecord = (id: string) => {
        const record = records.find((record) => record.id === id);
        if (record) {
            setRecordModal(record);
            showModalRecordInfo();
        }
    };

    const onSuccessRecord = () => {
        hideModalRecordInfo();
    };
    const onErrorRecord = () => {};

    const { deleteRecord } = useDeleteRecord(
        memberId,
        selectedDay,
        onSuccessRecord,
        onErrorRecord
    );

    //RecordMedicationModal
    const onDeleteMedicationRecord = async () => {
        if (recordModal) {
            const id = recordModal.id;
            if (id) {
                await deleteRecord(id);
            }
        }
    };

    const onSeeRecordMedication = () => {
        if (recordModal) {
            router.push({
                pathname: ROUTE.MEDICATIONS.BY_ID,
                params: {
                    id: recordModal.id,
                },
            });
        }
        hideModalRecordInfo();
    };

    const onSuccessToggleRecord = () => {
        hideModalRecordInfo();
    };
    const onErrorToggleRecord = () => {
        hideModalRecordInfo();
    };

    const { toggleRecordTake } = useToggleRecordTake(
        memberId,
        selectedDay,
        onSuccessToggleRecord,
        onErrorToggleRecord
    );

    const onSkipRecordMedication = () => {
        if (recordModal) toggleRecordTake(recordModal);
    };

    const onTakeOrUntakeRecordMedication = () => {
        if (recordModal) toggleRecordTake(recordModal);
    };

    //HANDLER to delete group member
    const onSuccessDeleteGroupMember = () => {
        hideModalDeleteMember();
        router.push({
            pathname: ROUTE.GROUPS.BASE_NAME,
            params: {
                id: groupId,
            },
        });
    };
    const onErrorDeleteGroupMember = () => {
        hideModalDeleteMember();
    };
    const { deleteGroupMember } = useDeleteGroupMember(
        groupId,
        onSuccessDeleteGroupMember,
        onErrorDeleteGroupMember
    );

    const deleteGroupMemberHandler = () => {
        if (user.id) deleteGroupMember(user.id);
    };

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && user && (
                <>
                    <Portal>
                        <Modal
                            visible={visibleDeleteMemberModal}
                            onDismiss={hideModalDeleteMember}
                            onDone={deleteGroupMemberHandler}
                            title="Delete Member"
                        >
                            <Text variant="bodyMedium">
                                Are you sure you want delete this member:{' '}
                                {user.firstName}?
                            </Text>
                        </Modal>
                    </Portal>

                    {recordModal && (
                        <Portal>
                            <MedicationRecordModal
                                onDismiss={hideModalRecordInfo}
                                visible={visibleRecord}
                                record={recordModal}
                                onDelete={onDeleteMedicationRecord}
                                onSeeMedication={onSeeRecordMedication}
                                onSkip={onSkipRecordMedication}
                                onTakeOrUnTake={onTakeOrUntakeRecordMedication}
                            />
                        </Portal>
                    )}
                    <View style={styles.buttonsContainer}>
                        <PrimaryButton onPress={onPressMemberRecord}>
                            See all Medications
                        </PrimaryButton>
                    </View>
                    <WeekDayPicker
                        selectedDay={selectedDay}
                        selectDay={selectDay}
                        startDay={startDay}
                    />
                    {!isLoading && isLoadingRecord && <ProgressIndicator />}
                    {isErrorRecord && (
                        <Text variant="headlineMedium">Error</Text>
                    )}
                    {isSuccessRecord && (
                        <RecordCards
                            isRefreshing={isLoading}
                            onRefresh={refetch}
                            records={records}
                            onPressRecord={onPressRecord}
                        />
                    )}

                    {!isLoadingRecord &&
                        isSuccessRecord &&
                        records &&
                        records.length === 0 && <EmptyPlannedMedications />}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 26,
        padding: 12,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
