import React from 'react';
import DropDown from 'react-native-paper-dropdown';

export interface ItemPickerProp {
    label: string;
    value: string;
}

export interface PickerProps {
    selectedValue: string;
    onValueChange: (value: string) => void;
    label: string;
    items: ItemPickerProp[];
}

export const Picker = ({
    label,
    selectedValue,
    onValueChange,
    items,
}: PickerProps) => {
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <DropDown
            value={selectedValue}
            visible={showDropdown}
            setValue={onValueChange}
            list={items}
            showDropDown={() => setShowDropdown(true)}
            onDismiss={() => setShowDropdown(false)}
            label={label}
            mode={'outlined'}
        />
    );
};
