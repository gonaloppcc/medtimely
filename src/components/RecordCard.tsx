import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MedicationRecord, RecordState } from '../model/medicationRecord';
import { MedicationIcon } from './MedicationIcon';

type MedCardProps = MedicationRecord & {
    state: RecordState;
    onPress: (id: string) => void;
};
export const RecordCard = ({
    id,
    units,
    dosage,
    form,
    name,
    state,
    onPress,
}: MedCardProps) => {
    const theme = useTheme();

    const title = units == null || units == 1 ? name : `${name} (x${units})`;

    const backgroundColor =
        state == RecordState.MISSED
            ? theme.colors.errorContainer
            : theme.colors.surface;

    const isTaken = state == RecordState.TAKEN;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${form}, ${dosage}`;

    const onPressRecord = () => {
        if (id == null) {
            return;
        }

        onPress(id);
    };

    return (
        <TouchableOpacity onPress={onPressRecord} style={style}>
            <MedicationIcon form={form} />
            <View style={styles.containerStyle}>
                <View style={styles.titleStyle}>
                    <Text
                        variant="bodyLarge"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {title}
                    </Text>
                    {isTaken && (
                        <Icon color="green" size={20} source="check-all" />
                    )}
                </View>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        alignItems: 'center',
        borderRadius: 5,
        padding: 12,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
    },
    titleStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
});
