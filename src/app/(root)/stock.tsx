import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useOwnedMedications } from '../../hooks/useOwnedMedications';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { Text } from 'react-native-paper';
import { StockCards } from '../../components/StockCards';
import { useState } from 'react';
import { ValuePicker } from '../../components/ValuePicker';

const PERSONAL_VALUE = 'Personal';

export default function StockScreen() {
    const { isSuccess, isLoading, isError, ownedMedications } =
        useOwnedMedications('1'); // TODO: Replace with user's token
    const [stockFilterSelected, setStockFilterSelected] =
        useState(PERSONAL_VALUE);
    const [stockItemFilter] = useState(ownedMedications); // FIXME: This is a temporary fix, idk what this actually is

    const stockFilters: { label: string; value: string }[] = [
        { label: PERSONAL_VALUE, value: PERSONAL_VALUE },
    ];

    if (isSuccess) {
        /*
        stock.groupsStock.forEach((group) =>
            stockFilters.push({
                label: group.groupName,
                value: group.groupName,
            })
        );
         */
    }

    const onPressPersonalStockHandler = (id: string) => {
        //TODO: do something
        console.log(id);
    };
    const selectValueHandler = (value: string) => {
        setStockFilterSelected(value);

        /*
        if (value == PERSONAL_VALUE) {
            setStockItemFilter(stock.personalStock);
        } else {
            const findGroup = stock.groupsStock.find(
                (group) => group.groupName == value
            );
            if (findGroup) {
                setStockItemFilter(findGroup.stock);
            } else {
                setStockItemFilter(stock.personalStock);
            }
        }
         */
    };

    return (
        <View style={styles.container}>
            {isError && (
                <Text variant="headlineMedium">Something went wrong</Text>
            )}
            {isLoading && <ProgressIndicator />}
            {isSuccess && ownedMedications && (
                <>
                    <ValuePicker
                        values={stockFilters}
                        selectValueHandler={selectValueHandler}
                        selectedValue={stockFilterSelected}
                    />
                    <StockCards
                        ownedMedications={stockItemFilter}
                        onPressOwnedMedication={onPressPersonalStockHandler}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
