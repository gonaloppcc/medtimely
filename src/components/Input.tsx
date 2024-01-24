import React from 'react';
import { TextInputProps } from 'react-native-paper';
import { StyleSheet, TextInput } from 'react-native';
import { useAppTheme } from '../theme';

export const Input = (props: TextInputProps) => {
    const theme = useAppTheme();

    const styles = StyleSheet.create({
        input: {
            width: '100%',
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            padding: 12,
        },
    });

    return (
        <TextInput
            style={styles.input}
            mode="outlined"
            {...props}
            placeholderTextColor={theme.colors.outline}
        />
    );
};
