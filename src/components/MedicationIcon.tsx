import React from 'react';
import { Icon, useTheme } from 'react-native-paper';
import { medicationFormToIconName } from '../model/Medicine';
import { MedicationRecordForm } from '../model/MedicationRecord';

export interface MedIconProps {
    form: MedicationRecordForm;
    size?: number;
    color?: string;
}

export const MedicationIcon = ({ form, size = 40, color }: MedIconProps) => {
    const theme = useTheme();

    const COLOR = color ? color : theme.colors.onSurface;
    const iconName = medicationFormToIconName(form);

    return <Icon size={size} source={iconName} color={COLOR} />;
};
