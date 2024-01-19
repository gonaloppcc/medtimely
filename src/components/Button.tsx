import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '../theme';

interface ButtonProps {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

const MODE = 'contained';

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: '100%',
    },
});

export const PrimaryButton = ({
    children,
    onPress,
    disabled,
    isLoading,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.mainContrast}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.main,
            }}
            mode={MODE}
            onPress={onPress}
            disabled={disabled}
            loading={isLoading}
        >
            {children}
        </PaperButton>
    );
};

export const SecondaryButton = ({
    children,
    onPress,
    disabled,
    isLoading,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.main}
            style={{
                ...styles.button,
                backgroundColor: '#212124',
            }}
            mode={MODE}
            onPress={onPress}
            disabled={disabled}
            loading={isLoading}
        >
            {children}
        </PaperButton>
    );
};

export const OutlineButton = ({
    children,
    onPress,
    disabled,
    isLoading,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.main}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.surface,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: theme.colors.main,
            }}
            mode={MODE}
            onPress={onPress}
            disabled={disabled}
            loading={isLoading}
        >
            {children}
        </PaperButton>
    );
};

export const GhostButton = ({
    children,
    onPress,
    disabled,
    isLoading,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.brand}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.surface,
            }}
            mode={MODE}
            onPress={onPress}
            disabled={disabled}
            loading={isLoading}
        >
            {children}
        </PaperButton>
    );
};

export const DestructiveButton = ({
    children,
    onPress,
    disabled,
    isLoading,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.brand}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.errorContainer,
            }}
            mode={MODE}
            onPress={onPress}
            disabled={disabled}
            loading={isLoading}
        >
            {children}
        </PaperButton>
    );
};
