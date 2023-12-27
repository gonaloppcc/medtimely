import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '../theme';

export const ProgressIndicator = () => {
    const theme = useAppTheme();
    return (
        <ActivityIndicator
            animating={true}
            color={theme.colors.brandContainer}
        />
    );
};
