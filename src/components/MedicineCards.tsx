import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Medicine } from '../model/Medicine';
import { MedicationCard } from './MedicineCard';

interface MedCardsProps {
    medicines: Medicine[];
}
export const MedicineCards = ({ medicines }: MedCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {medicines.map((medicine, index) => {
                return <MedicationCard key={index} {...medicine} />;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
