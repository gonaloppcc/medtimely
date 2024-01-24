import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '../theme';

interface ButtonProps {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    fullWidth?: boolean;
}

const MODE = 'contained';

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 0,
        //width: '100%',
    },
});

export const PrimaryButton = ({
    children,
    onPress,
    disabled,
    isLoading,
    fullWidth,
}: ButtonProps) => {
    const theme = useAppTheme();

    return (
        <PaperButton
            textColor={theme.colors.mainContrast}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.main,
                width: fullWidth ? '100%' : undefined,
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
    fullWidth,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.main}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.surface,
                width: fullWidth ? '100%' : undefined,
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
    fullWidth,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.main}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.surface,
                borderStyle: 'solid',
                borderWidth: 0,
                borderRadius: 5,
                borderColor: theme.colors.main,
                width: fullWidth ? '100%' : undefined,
            }}
            mode="outlined"
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
}: {
    children: string;
    onPress: () => void;
    disabled?: boolean;
}) => {
    return (
        <PaperButton onPress={onPress} disabled={disabled} mode="text">
            {children}
        </PaperButton>
    );
};

export const DestructiveButton = ({
    children,
    onPress,
    disabled,
    isLoading,
    fullWidth,
}: ButtonProps) => {
    const theme = useAppTheme();
    return (
        <PaperButton
            textColor={theme.colors.brand}
            style={{
                ...styles.button,
                backgroundColor: theme.colors.errorContainer,
                width: fullWidth ? '100%' : undefined,
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
