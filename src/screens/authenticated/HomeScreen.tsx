import * as React from 'react';
import { useState } from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { WeekDayPicker } from '../../components/WeekDayPicker';
import { RecordCards } from '../../components/RecordCards';
import { useRecords } from '../../hooks/useRecords';
import { ProgressIndicator } from '../../components/ProgressIndicator';

// TODO: In the future this should be changeable by the user
const startDay = new Date();

export function HomeScreen() {
    const user = useAuthentication();
    const [selectedDay, setSelectedDay] = useState(startDay);
    const { isSuccess, isLoading, isError, records, refetch } = useRecords(
        '1',
        selectedDay
    ); // TODO: Replace with user's token

    console.log('' + isSuccess + isLoading + isError + records + refetch); // TODO: Remove this once the data fetch call is implemented

    console.log(JSON.stringify(user));

    const userName = 'Jack'; // TODO: Replace with user's name

    console.log(userName);

    const selectDay = (day: Date) => {
        setSelectedDay(day);
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
            <RecordCards records={records} />
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
