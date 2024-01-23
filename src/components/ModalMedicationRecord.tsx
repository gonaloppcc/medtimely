import React from 'react';
import { Dialog, Icon, Text, useTheme } from 'react-native-paper';
import {
    DestructiveButton,
    OutlineButton,
    PrimaryButton,
    SecondaryButton,
} from './Button';
import { StyleSheet, View } from 'react-native';
import { MedicationRecord, RecordState } from '../model/medicationRecord';
import { MedicationIcon } from './MedicationIcon';
import { formatDateToString } from '../services/date';
import { getRecordState } from '../services/records';

interface MedicationRecordModalProps {
    record: MedicationRecord;
    visible: boolean;
    onDismiss: () => void;
    onDelete: () => void;
    onSeeMedication: () => void;
    onSkip: () => void;
    onTakeOrUnTake: () => void;
}

export const MedicationRecordModal: React.FC<MedicationRecordModalProps> = ({
    record,
    visible,
    onDismiss,
    onDelete,
    onSeeMedication,
    onSkip,
    onTakeOrUnTake,
}) => {
    const theme = useTheme();
    const dataRecord = formatDateToString(record.scheduledTime);

    const stateRecord = getRecordState(record);
    const takeOrUnTakenMsg =
        stateRecord == RecordState.TAKEN ? 'Untake' : 'Taken';

    const missedColor =
        stateRecord == RecordState.MISSED
            ? theme.colors.errorContainer
            : theme.colors.onSurface;

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Actions style={styles.titleContainer}>
                <OutlineButton onPress={onDismiss}>
                    <Icon size={20} source="close" />
                </OutlineButton>
                <OutlineButton onPress={onSeeMedication}>
                    <Text variant="bodySmall">See Medication</Text>
                </OutlineButton>
                <DestructiveButton onPress={onDelete}>
                    <Icon size={20} source="delete" />
                </DestructiveButton>
            </Dialog.Actions>
            <Dialog.Content>
                <View style={styles.iconContainer}>
                    <MedicationIcon
                        form={record.form}
                        size={60}
                        color={theme.colors.background}
                    />

                    <View style={styles.titleStyle}>
                        <Text variant="headlineMedium">{record.name}</Text>
                        {record.isTaken && (
                            <Icon color="green" size={20} source="check-all" />
                        )}
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.textIconContainer}>
                        <Icon color={missedColor} size={20} source="calendar" />
                        <Text
                            style={{ color: missedColor }}
                            variant="bodyMedium"
                        >{`Scheduled for ${dataRecord}`}</Text>
                    </View>
                    <View style={styles.textIconContainer}>
                        <Icon size={20} source="file-document" />
                        <Text variant="bodyMedium">{`Take ${record.units} unit, ${record.dosage}`}</Text>
                    </View>
                </View>
            </Dialog.Content>
            <Dialog.Actions style={styles.buttonsContainer}>
                <PrimaryButton onPress={onSkip}>Skip</PrimaryButton>
                <SecondaryButton onPress={onTakeOrUnTake}>
                    {takeOrUnTakenMsg}
                </SecondaryButton>
            </Dialog.Actions>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        gap: 15,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
    },
    container: {
        padding: 12,
        display: 'flex',
        gap: 8,
    },
    textIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    titleStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
