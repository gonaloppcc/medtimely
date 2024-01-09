import * as React from 'react';
import { useState } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { WeekDayPicker } from '../../components/WeekDayPicker';
import { RecordCards } from '../../components/RecordCards';
import { useRecords } from '../../hooks/useRecords';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../model/routes';

// TODO: In the future this should be changeable by the user
const startDay = new Date();

export default function HomeScreen() {
    const { user } = useAuthentication();
    const day =
        (useLocalSearchParams().day as string) || new Date().toISOString();
    const initialSelectedDay = new Date(day);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
    const { isSuccess, isLoading, isError, records, refetch } = useRecords(
        user?.uid ?? '', // TODO: Replace with user's token in the future
        selectedDay
    );

    const userName = 'Jack'; // TODO: Replace with user's name

    const selectDay = (day: Date) => {
        setSelectedDay(day);
    };

    const onPressRecord = (id: string) => {
        router.push({ pathname: ROUTE.RECORDS.BY_ID, params: { id } });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Welcome back, {userName}</Text>
            <WeekDayPicker
                selectedDay={selectedDay}
                selectDay={selectDay}
                startDay={startDay}
            />
            {isLoading && <ProgressIndicator />}
            {isError && <Text variant="headlineMedium">Error</Text>}
            {isSuccess && (
                <RecordCards
                    isRefreshing={isLoading}
                    onRefresh={refetch}
                    records={records}
                    onPressRecord={onPressRecord}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingBottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
