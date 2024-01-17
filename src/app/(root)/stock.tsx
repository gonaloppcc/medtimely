import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useOwnedMedications } from '../../hooks/useOwnedMedications';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { Text } from 'react-native-paper';
import { StockCards } from '../../components/StockCards';
import { ValuePicker } from '../../components/ValuePicker';
import { useGroupOwnedMedications } from '../../hooks/useGroupOwnedMedications';
import { EmptyStockMsg } from '../../components/EmptyStockMsg';

const PERSONAL_VALUE = 'Personal';

export default function StockScreen() {
    const [stockFilterSelected, setStockFilterSelected] =
        useState(PERSONAL_VALUE);

    const stockFilters: { label: string; value: string }[] = [
        { label: PERSONAL_VALUE, value: PERSONAL_VALUE },
    ];

    //TODO: Get groups's user
    const groupsUUID = ['Family', 'Uni'];
    groupsUUID.forEach((group) => {
        stockFilters.push({
            label: group,
            value: group,
        });
    });

    let isSuccess, isLoading, isError, ownedMedications;

    //TODO: change uuid and group uuid
    if (PERSONAL_VALUE !== stockFilterSelected) {
        ({ isSuccess, isLoading, isError, ownedMedications } =
            useGroupOwnedMedications('1', '1'));
    } else {
        ({ isSuccess, isLoading, isError, ownedMedications } =
            useOwnedMedications('1'));
    }

    const onPressPersonalStockHandler = (id: string) => {
        //TODO: do something
        console.log(id);
    };

    const selectValueHandler = (value: string) => {
        setStockFilterSelected(value);
    };

    return (
        <View style={styles.container}>
            <ValuePicker
                values={stockFilters}
                selectValueHandler={selectValueHandler}
                selectedValue={stockFilterSelected}
            />
            {isError && (
                <Text variant="headlineMedium">Something went wrong</Text>
            )}
            {isLoading && <ProgressIndicator />}
            {isSuccess && ownedMedications && ownedMedications.length > 0 && (
                <StockCards
                    ownedMedications={ownedMedications}
                    onPressOwnedMedication={onPressPersonalStockHandler}
                />
            )}
            {isSuccess && ownedMedications && ownedMedications.length == 0 && (
                <EmptyStockMsg />
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
