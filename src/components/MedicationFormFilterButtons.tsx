import React from 'react';
import { MedicationRecordForm } from '../model/medicationRecord';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useAppTheme } from '../theme';
import { medicationFormToIconName } from '../model/medication';

const ROUNDNESS = 0.8;

export interface FilterByFormProps {
    forms: MedicationRecordForm[];
    onValueChange: (newValue: MedicationRecordForm | '') => void;
    value: MedicationRecordForm | '';
}

export const MedicationFormFilterButtons = ({
    forms,
    value,
    onValueChange,
}: FilterByFormProps) => {
    const theme = useAppTheme();
    const medButtons: { value: string; label: string; icon: string }[] = [];

    for (const form of forms) {
        medButtons.push({
            label: form,
            value: form,
            icon: medicationFormToIconName(form),
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={onValueChange}
                buttons={medButtons}
                theme={{
                    roundness: ROUNDNESS,
                    colors: {
                        secondaryContainer: theme.colors.brandContainer,
                    },
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});
