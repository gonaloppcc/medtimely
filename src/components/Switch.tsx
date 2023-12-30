import React from 'react';
import { Switch as SwitchPaper } from 'react-native-paper';

interface SwitchProps {
    id: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export const Switch = ({ id, value, onValueChange }: SwitchProps) => {
    return <SwitchPaper id={id} value={value} onValueChange={onValueChange} />;
};
