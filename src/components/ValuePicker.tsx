import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { useAppTheme } from '../theme';
import { Text } from 'react-native-paper';

interface ValuePickerProps {
    selectedValue: string;
    values: { label: string; value: string }[];
    selectValueHandler: (value: string) => void;
}

const style = StyleSheet.create({
    picker: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
});

export const ValuePicker = ({
    selectedValue,
    values,
    selectValueHandler,
}: ValuePickerProps) => {
    return (
        <View style={style.picker}>
            {[
                values.map((value, i) => {
                    const isSelected = value.value == selectedValue;

                    const setSelectedValue = () => {
                        selectValueHandler(value.value);
                    };

                    const theme = useAppTheme();
                    const stylePicker: StyleProp<ViewStyle> = {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: isSelected
                            ? theme.colors.brandContainer
                            : theme.colors.surface,
                        gap: 8,
                    };

                    console.log('value, isSelected', value, isSelected);

                    return (
                        <TouchableOpacity
                            style={stylePicker}
                            onPress={setSelectedValue}
                            key={i}
                        >
                            <Text style={{ color: theme.colors.onSurface }}>
                                {value.label}
                            </Text>
                            {/* <Text style={{ color: theme.colors.outline }}>{dayNumber}</Text> */}
                        </TouchableOpacity>
                    );
                }),
            ]}
        </View>
    );
};
