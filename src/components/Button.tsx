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

export const Button = ({
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
                backgroundColor: theme.colors.brandContainer,
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

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: '100%',
    },
});
