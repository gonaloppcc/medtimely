import React from 'react';
import { MedicationRecord } from '../model/medicationRecord';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { RecordCard } from './RecordCard';
import { formateDateToHoursMinutesString } from '../services/date';
import { Text, useTheme } from 'react-native-paper';

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
    const theme = useTheme();
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
                    <>
                        <Text
                            variant="bodyMedium"
                            style={{ color: theme.colors.onSurface }}
                        >
                            {formateDateToHoursMinutesString(
                                record.scheduledTime
                            )}
                        </Text>
                        <RecordCard
                            key={index}
                            {...record}
                            onPress={onPressRecord}
                        />
                    </>
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
