import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useMedicationsByName } from '../../../hooks/useMedicationsByName';
import * as React from 'react';
import { useState } from 'react';
import { Input } from '../../../components/Input';
import { router } from 'expo-router';
import { GhostButton } from '../../../components/Button';
import { ROUTE } from '../../../model/routes';
import { MedicationCards } from '../../../components/MedicationCards';
import { useOwnedMedications } from '../../../hooks/useOwnedMedications';

export default function SearchModal() {
    const [search, setSearch] = useState('');
    // const { medications } = useOwnedMedicationsByName(search);

    return (
        <View style={styles.form}>
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
                            pathname: ROUTE.STOCK.ADD,
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
                        medications={medications}
                        onPressMedication={(id) => {
                            router.push({
                                pathname: ROUTE.STOCK.ADD,
                                params: {
                                    medicationId: id,
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
