import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { StockCards } from '../../components/StockCards';
import { ValuePicker } from '../../components/ValuePicker';
import { EmptyStockMsg } from '../../components/EmptyStockMsg';
import { useGroups } from '../../hooks/useGroups';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useStock } from '../../hooks/useStock';
import { ErrorMessage } from '../../hooks/ErrorMessage';

const PERSONAL_VALUE = 'Personal';

export default function StockScreen() {
    const [stockFilterSelected, setStockFilterSelected] =
        useState(PERSONAL_VALUE);

    const uid = useAuthentication().user?.uid ?? '';
    const {
        isLoading: isLoadingGroups,
        isError: isErrorGroups,
        isSuccess: isSuccessGroups,
        groups,
    } = useGroups(uid);

    const { isSuccess, isLoading, isError, ownedMedications } = useStock(
        uid,
        stockFilterSelected
    );

    const stockFilters: { label: string; value: string }[] = groups.map(
        (group) => {
            return {
                label: group.name,
                value: group.id,
            };
        }
    );

    stockFilters.unshift({ label: PERSONAL_VALUE, value: PERSONAL_VALUE });

    const onPressPersonalStockHandler = (id: string) => {
        //TODO: do something
        console.log(id);
    };

    const selectValueHandler = (value: string) => {
        setStockFilterSelected(value);
    };

    return (
        <View style={styles.container}>
            {isLoadingGroups && <ProgressIndicator />}
            {isErrorGroups && (
                <ErrorMessage errorMessage="Could not load groups" />
            )}
            {isSuccessGroups && (
                <ValuePicker
                    values={stockFilters}
                    selectValueHandler={selectValueHandler}
                    selectedValue={stockFilterSelected}
                />
            )}
            {isError && <ErrorMessage errorMessage="Could not load stock" />}
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
