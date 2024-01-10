import React from 'react';
import { Icon, useTheme } from 'react-native-paper';
import { MedicationRecordForm } from '../model/medicationRecord';
import { medicationFormToIconName } from '../model/medication';

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
