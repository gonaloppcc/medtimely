import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PersonalMedication } from '../model/Medicine';
import { MedicationCard } from './MedicineCard';

interface MedCardsProps {
    medicines: PersonalMedication[];
    onPressMedication: (id: string) => void;
}
export const MedicineCards = ({
    medicines,
    onPressMedication,
}: MedCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {medicines.map((medicine, index) => {
                return (
                    <MedicationCard
                        key={index}
                        {...medicine}
                        onPressMedication={onPressMedication}
                    />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
