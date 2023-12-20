import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WeekDay } from './WeekDay';

interface WeekDayPickerProps {
    startDay: Date;
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
    },
});

export const WeekDayPicker = ({
    startDay,
    selectedDay,
    selectDay,
}: WeekDayPickerProps) => {
    return (
        <View style={style.picker}>
            {[...Array(7)].map((_, i) => {
                const date = new Date(startDay);
                date.setDate(date.getDate() + i);

                const day = date.toLocaleString('default', {
                    weekday: 'short',
                });

                const dayNumber = date.getDate();

                // Only the day name is needed
                const dayName = day.substring(0, 3);

                const isSelected = selectedDay.getDate() === date.getDate();

                const setSelectedDay = () => {
                    selectDay(date);
                };

                return (
                    <WeekDay
                        key={i}
                        dayNumber={dayNumber}
                        dayName={dayName}
                        isSelected={isSelected}
                        selectDay={setSelectedDay}
                    />
                );
            })}
        </View>
    );
};
