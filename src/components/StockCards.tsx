import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { StockCard } from './StockCard';
import { OwnedMedication } from '../model/ownedMedication';

interface OwnedMedicationCardsProps {
    ownedMedications: OwnedMedication[];
    onPressOwnedMedication: (id: string) => void;
    isRefreshing: boolean;
    onRefresh?: () => void;
}

export const StockCards = ({
    ownedMedications,
    onPressOwnedMedication,
    isRefreshing,
    onRefresh,
}: OwnedMedicationCardsProps) => {
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
