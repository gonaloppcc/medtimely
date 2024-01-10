import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MedicationCard } from './MedicationCard';
import { Medication } from '../model/medication';

interface MedicationCardsProps {
    medications: Medication[];
}

export const MedicationCards = ({ medications }: MedicationCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {medications.map((medication, index) => {
                return <MedicationCard key={index} {...medication} />;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
