import React from 'react';
import { Icon, useTheme } from 'react-native-paper';
import { medicationFormToIconName } from '../model/Medicine';

export interface MedIconProps {
    form: string
}

export const MedicationIcon = ({
    form,
}: MedIconProps) => {
    const theme = useTheme();

    const iconName = medicationFormToIconName(form);

    return (
            <Icon size={40} source={iconName} color={theme.colors.onSurface} />
    );
};
