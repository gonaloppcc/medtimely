import React from 'react';
import { MedicationRecord } from '../model/medicationRecord';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { RecordCard } from './RecordCard';
import { formatDateToHoursMinutesString } from '../services/date';
import { Text, useTheme } from 'react-native-paper';
import { getRecordState } from '../services/records';

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

    records.sort(
        (recordA, recordB) =>
            recordA.scheduledTime.getTime() - recordB.scheduledTime.getTime()
    );

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
                    <View key={index}>
                        <Text
                            variant="bodyMedium"
                            style={{ color: theme.colors.onSurface }}
                        >
                            {formatDateToHoursMinutesString(
                                record.scheduledTime
                            )}
                        </Text>
                        <RecordCard
                            state={getRecordState(record)}
                            {...record}
                            onPress={onPressRecord}
                        />
                    </View>
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
