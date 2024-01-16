// Checkbox.tsx

import React from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';

export interface CheckboxProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange }) => {
    return (
        <PaperCheckbox.Item
            label={label}
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onValueChange(!value)}
        />
    );
};

export default Checkbox;
