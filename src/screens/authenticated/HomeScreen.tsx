import * as React from 'react';

import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { WeekDayPicker } from '../../components/WeekDayPicker';
import { RecordCards } from '../../components/RecordCards';
import { MedicationsScreen } from './MedicationsScreen';
import { SettingsScreen } from './SettingsScreen';
import { RecordsScreen } from './RecordsScreen';
import { useRecords } from '../../hooks/useRecords';

export function HomeScreen() {
    const user = useAuthentication();
    const { isSuccess, isLoading, isError, records, refetch } = useRecords('1'); // TODO: Replace with user's token

    console.log('' + isSuccess + isLoading + isError + records + refetch); // TODO: Remove this once the data fetch call is implemented

    console.log(JSON.stringify(user));

    const userName = 'Jack'; // TODO: Replace with user's name

    console.log(userName);

    const [selectedDay, setSelectedDay] = React.useState(
        new Date(2023, 11, 17)
    );

    const selectDay = (day: Date) => {
        setSelectedDay(day);
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Welcome back, {userName}</Text>
            <WeekDayPicker
                selectedDay={selectedDay}
                selectDay={selectDay}
                weekDate={new Date(2023, 11, 17)}
            />
            <RecordCards records={records} />
        </View>
    );
}

// TODO: Add this as Tab.Navigator
export function HomeNav() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home' },
        // TODO: custom icon
        { key: 'medications', title: 'Medications', focusedIcon: 'pill' },
        { key: 'records', title: 'Records', focusedIcon: 'account-circle' },
        { key: 'settings', title: 'Settings', focusedIcon: 'cog' },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        medications: MedicationsScreen,
        records: RecordsScreen,
        settings: SettingsScreen,
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
