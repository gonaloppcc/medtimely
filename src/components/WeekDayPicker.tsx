import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { WeekDay } from './WeekDay';
import { Text } from 'react-native-paper';
import InfinitePager from 'react-native-infinite-pager';

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
        marginBottom: 3,
    },
    pickerContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    weekdayContainer: {
        // display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
});

export const WeekDayPicker = ({
    startDay,
    selectedDay,
    selectDay,
}: WeekDayPickerProps) => {
    return (
        <InfinitePager
            PageComponent={({ index }: { index: number }) => (
                <FlatList
                    columnWrapperStyle={style.picker}
                    data={[...Array(7)]
                        .map((_, _i) => {
                            const i = _i + index * 7;
                            const date = new Date(startDay);
                            date.setDate(date.getDate() + i);

                            return [
                                { date, i: _i, title: true },
                                { date, i: _i, title: false },
                            ];
                        })
                        .flat()
                        .sort(({ title: a }, { title: b }) => {
                            if (a && !b) return -1;
                            if (!a && b) return 1;
                            return 0;
                        })}
                    numColumns={7}
                    renderItem={({ item: { date, i, title } }) => {
                        const day = date.toLocaleString('default', {
                            weekday: 'short',
                        });

                        const dayNumber = date.getDate();

                        // Only the day name is needed
                        const dayName = day.substring(0, 3);

                        const isSelected =
                            selectedDay.getDate() === date.getDate();

                        const setSelectedDay = () => {
                            selectDay(date);
                        };

                        if (title) {
                            // return <Text>mon</Text>;
                            return (
                                <View style={style.weekdayContainer}>
                                    {i == 0 || date.getDate() == 1 ? (
                                        <Text variant="bodySmall">
                                            {date.toLocaleString('default', {
                                                month: 'short',
                                            })}
                                        </Text>
                                    ) : (
                                        <View style={{ width: '100%' }} />
                                    )}
                                </View>
                            );
                        }

                        return (
                            <WeekDay
                                key={i}
                                dayNumber={dayNumber}
                                dayName={dayName}
                                isSelected={isSelected}
                                selectDay={setSelectedDay}
                            />
                        );
                    }}
                />
            )}
        />
    );
};
