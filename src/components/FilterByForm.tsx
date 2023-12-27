import React from "react";
import { MedicationRecordForm } from "../model/MedicationRecord";
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from "react-native-paper";
import { medicationFormToIconName } from "../model/Medicine";
import { useAppTheme } from '../theme';

export interface FilterByFormProps {
    forms: MedicationRecordForm[],
    onValueChange: (newValue: MedicationRecordForm | '') => void;
    value: MedicationRecordForm | '',
}

export const FilterByForm = ({forms, value, onValueChange} : FilterByFormProps) => {
    const theme = useAppTheme();
    const medButtons: {value: string, label: string, icon: string}[] = [];

    for (const form of forms) {
        medButtons.push({
            label: form,
            value: form,
            icon: medicationFormToIconName(form),
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
              value={value}
              onValueChange={onValueChange}
              buttons={medButtons}
              theme={{
                roundness: 0.8,
                colors:{
                    secondaryContainer: theme.colors.brandContainer ,
                },
              }}
            />
        </SafeAreaView>
)}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});