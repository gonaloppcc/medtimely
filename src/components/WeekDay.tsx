import React from 'react';
import { Text } from 'react-native-paper';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme';

interface WeekDayProps {
    dayNumber: number; // From 1 to 31
    dayName: string; // From 'Mon' to 'Sun'
    isSelected: boolean;
    selectDay: (day: Date) => void;
}

export const WeekDay = ({ dayNumber, dayName, isSelected }: WeekDayProps) => {
    const theme = useAppTheme();
    const style: StyleProp<ViewStyle> = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        backgroundColor: theme.colors.surface,
        gap: 8,
    };

    if (isSelected) {
        style.backgroundColor = theme.colors.brandContainer;
    }

    return (
        <View style={style}>
            <Text style={{ color: theme.colors.onSurface }}>{dayName}</Text>
            <Text style={{ color: theme.colors.outline }}>{dayNumber}</Text>
        </View>
    );
};
