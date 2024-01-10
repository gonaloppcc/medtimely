import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MedicationIcon } from './MedicationIcon';
import { GroupStockItem } from '../model/stock';

type GroupStockItemCardProps = GroupStockItem & {
    onPressStock: (id: string) => void;
    // Added any extra props here
};

export const GroupStockItemCard = ({
    medicationId,
    medicationName,
    form,
    amountLeft,
    daysToRunOf,
    numberOfPersons,
    onPressStock,
}: GroupStockItemCardProps) => {
    const theme = useTheme();

    const title = medicationName;

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${form}, ${amountLeft} left`;

    const onPress = () => {
        onPressStock(medicationId);
    };

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <MedicationIcon form={form} />
            <View style={styles.innerStyle}>
                <Text
                    variant="labelLarge"
                    style={{ color: theme.colors.onSurface }}
                >
                    {title}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {subtitle}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {daysToRunOf} days to run out
                </Text>

                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {numberOfPersons} persons use this
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center',
        borderRadius: 5,
        padding: 12,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    innerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});
