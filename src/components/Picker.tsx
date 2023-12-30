import React from 'react';
import { Picker as PickerImport } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '../theme';

interface PickerProps {
    selectedValue: string;
    onValueChange: (itemValue: string, itemIndex: number) => void;
    items: { label: string; value: string }[];
}
export const Picker = ({
    selectedValue,
    onValueChange,
    items,
}: PickerProps) => {
    const theme = useAppTheme();

    const styles = StyleSheet.create({
        picker: {
            width: '100%',
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
        },
        item: {
            color: theme.colors.text,
            backgroundColor: theme.colors.surface,
        },
    });

    return (
        <PickerImport
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
            mode={'dialog'}
            itemStyle={styles.item}
        >
            {items.map(({ label, value }) => (
                <PickerImport.Item
                    key={value}
                    label={label}
                    value={value}
                    style={styles.item}
                />
            ))}
        </PickerImport>
    );
};
