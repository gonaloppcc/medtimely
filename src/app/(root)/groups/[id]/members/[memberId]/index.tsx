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

const startDay = new Date();

export default function GroupMemberScreen() {
    const localSearchParams = useLocalSearchParams();
    const groupId = localSearchParams.groupId as string;
    const memberId = localSearchParams.memberId as string;

    const headerRight = () => (
        <Appbar.Action
            icon="delete"
            onPress={() => {
                //TODO:  DELETE MEMBER FROM GROUP
            }}
        />
    );

    useNavOptions({
        headerRight,
    });

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
    const [visible, setVisible] = useState(false);
    const [recordModal, setRecordModal] = useState<MedicationRecord>();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const onPressRecord = (id: string) => {
        const record = records.find((record) => record.id === id);
        if (record) {
            setRecordModal(record);
            showModal();
        }
    };

    //RecordMedicationModa
    const onDeleteRecord = () => {
        //TODO: delete record from that user
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
        hideModal();
    };

    const onSkipRecordMedication = () => {
        //TODO: delete record
    };

    const onTakeOrUntakeRecordMedication = () => {
        //TODO: delete record
    };

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && user && (
                <>
                    {recordModal && (
                        <Portal>
                            <MedicationRecordModal
                                onDismiss={hideModal}
                                visible={visible}
                                record={recordModal}
                                onDelete={onDeleteRecord}
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

                    {isSuccessRecord && records.length == 0 && (
                        <EmptyPlannedMedications />
                    )}
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
