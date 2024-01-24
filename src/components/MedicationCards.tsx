import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Medication } from '../model/medication';
import { MedicationCard } from './MedicationCard';

interface MedicationCardsProps {
    medications: Medication[];
    onPressMedication: (id: string) => void;
}

export const MedicationCards = ({
    medications,
    onPressMedication,
}: MedicationCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {medications.map((medication, index) => {
                const onPressMedicationHandler = () => {
                    onPressMedication(medication.id);
                };

                return (
                    <MedicationCard
                        key={index}
                        {...medication}
                        onPressMedication={onPressMedicationHandler}
                    />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
        paddingBottom: 12,
    },
});
