import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { StockCards } from '../../../components/StockCards';
import { ValuePicker } from '../../../components/ValuePicker';
import { EmptyStockMsg } from '../../../components/EmptyStockMsg';
import { useGroups } from '../../../hooks/useGroups';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useStock } from '../../../hooks/useStock';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { router } from 'expo-router';
import { Appbar, Portal } from 'react-native-paper';
import { useNavOptions } from '../../../hooks/useNavOptions';
import { ROUTE } from '../../../model/routes';
import { OwnedMedication } from '../../../model/ownedMedication';
import { ModalStock } from '../../../components/ModalStock';

const PERSONAL_VALUE = 'Personal';

export default function StockScreen() {
    const [stockFilterSelected, setStockFilterSelected] =
        useState(PERSONAL_VALUE);

    const headerRight = () => (
        <Appbar.Action
            icon="plus"
            onPress={() =>
                router.push({
                    pathname: ROUTE.STOCK.ADD,
                })
            }
        />
    );

    useNavOptions({
        headerRight,
    });

    const uid = useAuthentication().user?.uid ?? '';

    const {
        isError: isErrorGroups,
        isSuccess: isSuccessGroups,
        groups,
    } = useGroups(uid);

    const { isSuccess, isLoading, isError, ownedMedications, refetch } =
        useStock(uid, stockFilterSelected);

    const [ownedMedicationModal, setOwnedMedicationModal] =
        useState<OwnedMedication>();
    //MODAl
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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
        const medication = ownedMedications.find((med) => med.id === id);
        if (medication) {
            setOwnedMedicationModal(medication);
            showModal();
        }
    };

    const selectValueHandler = (value: string) => {
        setStockFilterSelected(value);
    };

    //Modal handler
    const onSeeMedication = () => {
        if (ownedMedicationModal) {
            router.push({
                pathname: ROUTE.MEDICATIONS.BY_ID,
                params: {
                    id: ownedMedicationModal.id,
                },
            });
            hideModal();
        }
    };

    const onConsumeStock = () => {
        //TODO: call function
    };

    return (
        <View style={styles.container}>
            {ownedMedicationModal && (
                <Portal>
                    <ModalStock
                        ownedMedication={ownedMedicationModal}
                        visible={visible}
                        onSeeMedication={onSeeMedication}
                        onConsume={onConsumeStock}
                        onDismiss={hideModal}
                    />
                </Portal>
            )}
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
                    isRefreshing={isLoading}
                    onRefresh={refetch}
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
