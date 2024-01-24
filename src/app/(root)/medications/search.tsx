import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as React from 'react';
import { useState } from 'react';
import { Input } from '../../../components/Input';
import { router } from 'expo-router';
import { GhostButton } from '../../../components/Button';
import { ROUTE } from '../../../model/routes';
import { MedicationCards } from '../../../components/MedicationCards';
import { useOwnedMedicationsByName } from '../../../hooks/useOwnedMedicationsByName';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useGroups } from '../../../hooks/useGroups';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { ValuePicker } from '../../../components/ValuePicker';

export default function SearchModal() {
    const [stockFilterSelected, setStockFilterSelected] = useState('Personal');
    const [search, setSearch] = useState('');
    // TODO: mudar isto
    const uid = useAuthentication().user!.uid;
    const { ownedMedications } = useOwnedMedicationsByName(
        uid,
        search,
        stockFilterSelected == 'Personal' ? undefined : stockFilterSelected
    );

    const {
        isError: isErrorGroups,
        isSuccess: isSuccessGroups,
        groups,
    } = useGroups(uid);

    const stockFilters: { label: string; value: string }[] = groups.map(
        (group) => {
            return {
                label: group.name,
                value: group.id,
            };
        }
    );

    stockFilters.unshift({ label: 'Personal', value: 'Personal' });

    return (
        <View style={styles.form}>
            {isErrorGroups && (
                <ErrorMessage errorMessage="Could not load groups" />
            )}
            {isSuccessGroups && (
                <ValuePicker
                    values={stockFilters}
                    selectValueHandler={setStockFilterSelected}
                    selectedValue={stockFilterSelected}
                />
            )}
            <View style={styles.searchBar}>
                <View style={styles.input}>
                    <Input
                        value={search}
                        onChangeText={setSearch}
                        label="Search"
                        placeholder="Search"
                    />
                </View>
                <GhostButton
                    onPress={() => {
                        router.push({
                            pathname: '/medications/new',
                        });
                    }}
                >
                    Cancel
                </GhostButton>
            </View>

            <View style={styles.medicationsCards}>
                {search === '' ? (
                    <Text>Search for a medication to use</Text>
                ) : (
                    <MedicationCards
                        medications={ownedMedications}
                        onPressMedication={(id) => {
                            router.push({
                                pathname: '/medications/new',
                                params: {
                                    selectedMedicationId: id,
                                },
                            });
                        }}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
        padding: 12,
    },
    searchBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
    },
    cancelContainer: {},
    medicationsCards: {
        width: '100%',
    },
});
