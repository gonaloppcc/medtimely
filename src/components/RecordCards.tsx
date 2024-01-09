import React from 'react';
import { MedicationRecord } from '../model/MedicationRecord';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { RecordCard } from './RecordCard';

interface MedCardsProps {
    records: MedicationRecord[];
    isRefreshing: boolean;
    onRefresh?: () => void;
    onPressRecord: (id: string) => void;
}

export const RecordCards = ({
    records,
    isRefreshing,
    onRefresh,
    onPressRecord,
}: MedCardsProps) => {
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
            {records.map((record, index) => {
                return (
                    <RecordCard
                        key={index}
                        {...record}
                        onPress={onPressRecord}
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
