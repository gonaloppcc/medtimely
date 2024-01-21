import React, { ReactNode } from 'react';
import { Dialog } from 'react-native-paper'; // Certifique-se de importar o Modal do pacote correto
import { DestructiveButton, OutlineButton } from './Button';
import { StyleSheet } from 'react-native';

interface ModalProps {
    title: string;
    children: ReactNode;
    visible: boolean;
    onDismiss: () => void;
    onDone: () => void;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    children,
    visible,
    onDismiss,
    onDone,
}) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>{children}</Dialog.Content>
            <Dialog.Actions style={styles.buttonsContainer}>
                <OutlineButton onPress={onDismiss}>Cancel</OutlineButton>
                <DestructiveButton onPress={onDone}>Yes</DestructiveButton>
            </Dialog.Actions>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        gap: 15,
    },
});
