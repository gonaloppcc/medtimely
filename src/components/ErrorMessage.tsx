import React from 'react';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../theme';

interface ErrorMessageProps {
    errorMessage: string;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
    const theme = useAppTheme();

    return (
        <Text variant="bodySmall" style={{ color: theme.colors.error }}>
            {errorMessage}
        </Text>
    );
};
