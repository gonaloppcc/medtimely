import React from 'react';
import { MedicationRecord } from '../model/MedicationRecord';
import { ScrollView, StyleSheet } from 'react-native';
import { RecordCard } from './RecordCard';

interface MedCardsProps {
    records: MedicationRecord[];
}
export const RecordCards = ({ records }: MedCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {records.map((record, index) => {
                return <RecordCard key={index} {...record} />;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
