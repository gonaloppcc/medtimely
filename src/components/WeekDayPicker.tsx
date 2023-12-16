import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WeekDay} from './WeekDay';

interface WeekDayPickerProps {
    weekDate: Date;
    selectDay: (day: Date) => void;
    selectedDay: Date;
}

const style = StyleSheet.create({
    picker: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export const WeekDayPicker = ({weekDate, selectedDay, selectDay}: WeekDayPickerProps) => {
    return (
        <View style={style.picker}>
            {
                [...Array(7)].map((_, i) => {
                    const date = new Date(weekDate);
                    date.setDate(date.getDate() + i);

                    const day = date.toLocaleString('default', {weekday: 'short'});

                    const dayNumber = date.getDate();

                    // Only the day name is needed
                    const dayName = day.substring(0, 3);

                    const isSelected = selectedDay.getDate() === date.getDate();

                    return (
                        <WeekDay key={i} dayNumber={dayNumber} dayName={dayName} isSelected={isSelected}
                            selectDay={selectDay}/>
                    );
                })
            }
        </View>
    );
};
