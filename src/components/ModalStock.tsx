import React from 'react';
import { Dialog, Icon, Text, useTheme } from 'react-native-paper';
import { OutlineButton } from './Button';
import { StyleSheet, View } from 'react-native';
import { MedicationIcon } from './MedicationIcon';
import { OwnedMedication } from '../model/ownedMedication';

interface StockModalProps {
    ownedMedication: OwnedMedication;
    visible: boolean;
    onSeeMedication: () => void;
    onDismiss: () => void;
    onConsume: () => void;
}

export const ModalStock: React.FC<StockModalProps> = ({
    ownedMedication,
    visible,
    onSeeMedication,
    onConsume,
    onDismiss,
}) => {
    const theme = useTheme();

    const hasEmpty = ownedMedication.stock <= 0;

    const hasEmptyColor = hasEmpty
        ? theme.colors.errorContainer
        : theme.colors.onSurface;

    //TODO: fixme
    const daysToRunOut = 0;

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Actions style={styles.titleContainer}>
                <OutlineButton onPress={onDismiss}>
                    <Icon size={20} source="close" />
                </OutlineButton>
                <OutlineButton onPress={onSeeMedication}>
                    <Text variant="bodySmall">See Medication</Text>
                </OutlineButton>
            </Dialog.Actions>
            <Dialog.Content>
                <View style={styles.iconContainer}>
                    <MedicationIcon
                        form={ownedMedication.form}
                        size={60}
                        color={theme.colors.background}
                    />

                    <View style={styles.titleStyle}>
                        <Text variant="headlineMedium">
                            {ownedMedication.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.textIconContainer}>
                        <Icon
                            color={hasEmptyColor}
                            size={20}
                            source="archive"
                        />
                        <Text
                            style={{ color: hasEmptyColor }}
                            variant="bodyMedium"
                        >{`${ownedMedication.stock} in stock`}</Text>
                    </View>
                    <View style={styles.textIconContainer}>
                        <Icon
                            color={hasEmptyColor}
                            size={20}
                            source="calendar"
                        />
                        <Text
                            style={{ color: hasEmptyColor }}
                            variant="bodyMedium"
                        >{`${daysToRunOut} day(s) to run out`}</Text>
                    </View>
                </View>
            </Dialog.Content>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        gap: 15,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
    },
    container: {
        padding: 12,
        display: 'flex',
        gap: 8,
    },
    textIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    titleStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
