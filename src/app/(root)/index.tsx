import * as React from 'react';
import { useState } from 'react';
import { Portal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { WeekDayPicker } from '../../components/WeekDayPicker';
import { RecordCards } from '../../components/RecordCards';
import { useRecords } from '../../hooks/useRecords';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { router, useLocalSearchParams } from 'expo-router';
import { MedicationRecordModal } from '../../components/ModalMedicationRecord';
import { MedicationRecord } from '../../model/medicationRecord';
import { ROUTE } from '../../model/routes';
import { useDeleteRecord } from '../../hooks/useDeleteRecord';
import { useToggleRecordTake } from '../../hooks/useToggleRecordTaken';
import { scheduleNotificationsForUser, setNotificationHandler } from '../../services/notifications';

const startDay = new Date();

const getFormattedUserName = (userName: string): string => {
    const spaceIndex = userName.indexOf(' ');

    if (spaceIndex !== -1) {
        userName = userName.substring(0, spaceIndex);
    }

    userName =
        userName.length > 8 ? userName.substring(0, 6) + '...' : userName;
    return userName;
};


export default function HomeScreen() {
    const { user } = useAuthentication();
    const uid = user?.uid ?? '';
    const day =
        (useLocalSearchParams().day as string) || new Date().toISOString();
    const initialSelectedDay = new Date(day);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
    const { isSuccess, isLoading, isError, records, refetch } = useRecords(
        uid,
        selectedDay
    );
    const [recordModal, setRecordModal] = useState<MedicationRecord>();

    setNotificationHandler();
    scheduleNotificationsForUser(records);

    const onSuccessRecord = () => {
        hideModal();
    };
    const onErrorRecord = () => {};

    const { deleteRecord } = useDeleteRecord(
        uid,
        selectedDay,
        onSuccessRecord,
        onErrorRecord
    );

    //MODAl
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const userName =
        user && user.displayName ? getFormattedUserName(user.displayName) : '';
    const welcomeString = user ? `Welcome back, ${userName}` : 'Welcome back';

    const selectDay = (day: Date) => {
        setSelectedDay(day);
    };

    const onPressRecord = (id: string) => {
        const record = records.find((record) => record.id === id);
        if (record) {
            setRecordModal(record);
            showModal();
        }
    };

    const onDeleteRecord = async () => {
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
                    id: recordModal.ownedMedicationRef,
                },
            });
        }
        hideModal();
    };

    const onSuccessToggleRecord = () => {
        hideModal();
    };
    const onErrorToggleRecord = () => {
        hideModal();
    };

    const { toggleRecordTake } = useToggleRecordTake(
        uid,
        selectedDay,
        onSuccessToggleRecord,
        onErrorToggleRecord
    );

    const onSkipRecordMedication = async () => {
        if (recordModal) await toggleRecordTake(recordModal);
    };

    const onTakeOrUntakeRecordMedication = async () => {
        if (recordModal) await toggleRecordTake(recordModal);
    };

    return (
        <View style={styles.container}>
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
            <Text variant="headlineMedium">{welcomeString}</Text>
            <WeekDayPicker
                selectedDay={selectedDay}
                selectDay={selectDay}
                startDay={startDay}
            />
            {isLoading && <ProgressIndicator />}
            {isError && <Text variant="headlineMedium">Error</Text>}
            {isSuccess && (
                <RecordCards
                    isRefreshing={isLoading}
                    onRefresh={refetch}
                    records={records}
                    onPressRecord={onPressRecord}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingBottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
