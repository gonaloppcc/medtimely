import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StockCard } from './StockCard';
import { OwnedMedication } from '../model/ownedMedication';

interface OwnedMedicationCardsProps {
    ownedMedications: OwnedMedication[];
    onPressOwnedMedication: (id: string) => void;
}

export const StockCards = ({
    ownedMedications,
    onPressOwnedMedication,
}: OwnedMedicationCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {ownedMedications.map((med, index) => {
                return (
                    <StockCard
                        {...med}
                        onPressStock={onPressOwnedMedication}
                        key={index}
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
