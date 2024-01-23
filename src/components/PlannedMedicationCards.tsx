import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { PlannedMedicationCard } from './PlannedMedicationCard';
import { PlannedMedication } from '../model/ownedMedication';

interface MedicationCardsProps {
    medications: PlannedMedication[];
    onPressMedication: (id: string) => void;
    isRefreshing: boolean;
    onRefresh?: () => void;
}

export const PlannedMedicationCards = ({
    medications,
    onPressMedication,
    isRefreshing,
    onRefresh,
}: MedicationCardsProps) => {
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                ></RefreshControl>
            }
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {medications.map((medication, index) => {
                return (
                    <PlannedMedicationCard
                        key={index}
                        {...medication}
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
        paddingBottom: 12,
    },
});
