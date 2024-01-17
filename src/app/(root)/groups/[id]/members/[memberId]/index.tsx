import React, { useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../../../components/Button';
import { useNavOptions } from '../../../../../../hooks/useNavOptions';
import { WeekDayPicker } from '../../../../../../components/WeekDayPicker';
import { ProgressIndicator } from '../../../../../../components/ProgressIndicator';
import { RecordCards } from '../../../../../../components/RecordCards';
import { router, useLocalSearchParams } from 'expo-router';
import { useRecords } from '../../../../../../hooks/useRecords';
import { ROUTE } from '../../../../../../model/routes';

// TODO: In the future this should be changeable by the user
const startDay = new Date();

export default function GroupMemberScreen() {
    const theme = useTheme();
    const day =
        (useLocalSearchParams().day as string) || new Date().toISOString();
    const initialSelectedDay = new Date(day);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
    const backgroundColor = theme.colors.errorContainer;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    useNavOptions({
        headerTitle: 'memberName',
    });

    const onPressMemberMeds = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBER_MEDS });
    };

    const onPressMemberRecord = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBER_RECORDS });
    };

    const selectDay = (day: Date) => {
        setSelectedDay(day);
    };

    return (
        <View style={styles.innerStyle}>
            <Button onPress={onPressMemberMeds}>Records History</Button>
            <Button onPress={onPressMemberRecord}>Meds</Button>
            <Text
                variant="labelLarge"
                style={{ color: theme.colors.onSurface }}
            >
                {'Hello'}
            </Text>
            <WeekDayPicker
                selectedDay={selectedDay}
                selectDay={selectDay}
                startDay={startDay}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center',
        borderRadius: 5,
        padding: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        // borderColor: 'rgba(0,0,0,0.15)',
    },
    innerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});
