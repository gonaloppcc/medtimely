import React, { useEffect, useState } from 'react';
import { Dialog, Icon, Text, useTheme } from 'react-native-paper';
import { OutlineButton, PrimaryButton, SecondaryButton } from './Button';
import { StyleSheet, View } from 'react-native';
import { MedicationIcon } from './MedicationIcon';
import { OwnedMedication } from '../model/ownedMedication';

interface StockModalProps {
    ownedMedication: OwnedMedication;
    visible: boolean;
    onSeeMedication: () => void;
    onDismiss: () => void;
    onUpdateStock: (value: number) => void;
}

export const ModalStock: React.FC<StockModalProps> = ({
    ownedMedication,
    visible,
    onSeeMedication,
    onUpdateStock,
    onDismiss,
}) => {
    const theme = useTheme();
    const [value, setValue] = useState(ownedMedication.stock);

    const hasEmpty = ownedMedication.stock <= 0;

    const hasEmptyColor = hasEmpty
        ? theme.colors.errorContainer
        : theme.colors.onSurface;

    //TODO: fixme
    const daysToRunOut = 0;

    useEffect(() => {
        setValue(ownedMedication.stock);
    }, [ownedMedication.stock]);

    const onIncrement = () => {
        setValue(value + 1);
    };

    const onDecrement = () => {
        setValue(value - 1);
    };

    const onUpdate = () => {
        onUpdateStock(value);
    };

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
                <View style={styles.addStockInputContainer}>
                    <View style={styles.addStockInput}>
                        <SecondaryButton onPress={onDecrement}>
                            <Icon
                                color={hasEmptyColor}
                                size={20}
                                source="minus"
                            />
                        </SecondaryButton>

                        <Text
                            style={{ color: hasEmptyColor }}
                            variant="bodyMedium"
                        >
                            {value}
                        </Text>

                        <SecondaryButton onPress={onIncrement}>
                            <Icon
                                color={hasEmptyColor}
                                size={20}
                                source="plus"
                            />
                        </SecondaryButton>
                    </View>
                    <PrimaryButton onPress={onUpdate}> Update </PrimaryButton>
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
    addStockInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        gap: 12,
    },
    addStockInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-between',
    },
    titleStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
