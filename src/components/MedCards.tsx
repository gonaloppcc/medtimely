import React from 'react';
import {MedicationRecord} from '../model/MedicationRecord';
import {ScrollView, StyleSheet} from 'react-native';
import MedCard from './MedCard';

interface MedCardsProps {
    records: MedicationRecord[];
}
export const MedCards = ({records}: MedCardsProps) => {
    return <ScrollView contentContainerStyle={styles.scrollView} alwaysBounceVertical={false}>
        {records.map((record, index) => {
            return <MedCard key={index} {...record}/>;
        })}
    </ScrollView>;
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    }
});

