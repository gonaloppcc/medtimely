import React from 'react';
import {Text} from 'react-native-paper';
import {StyleProp, View, ViewStyle} from 'react-native';

interface WeekDayProps {
    dayNumber: number; // From 1 to 31
    dayName: string; // From 'Mon' to 'Sun'
    isSelected: boolean;
    selectDay: (day: Date) => void;
}


const dayNumberColor = '#B1A7A6';
const dayNameColor = '#000';
const selectedDayColor = '#F5F3F4';

export const WeekDay = ({dayNumber, dayName, isSelected}: WeekDayProps) => {
    const style: StyleProp<ViewStyle> = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        gap: 8,
    };
    
    if (isSelected) {
        style.backgroundColor = selectedDayColor;
    }

    return (
        <View style={style}>
            <Text style={{color: dayNameColor}}>{dayName}</Text>
            <Text style={{color: dayNumberColor}}>{dayNumber}</Text>
        </View>
    );
};
