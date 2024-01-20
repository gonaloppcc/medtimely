import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MedicationCards } from '../../../components/MedicationCards';
import { useMedicationsByName } from '../../../hooks/useMedicationsByName';
import * as React from 'react';
import { useState } from 'react';
import { Input } from '../../../components/Input';
import { router } from 'expo-router';
import { GhostButton } from '../../../components/Button';

export default function SearchModal() {
    const [search, setSearch] = useState('');
    const { medications } = useMedicationsByName(search);

    return (
        <View style={styles.form}>
            <View style={styles.searchBar}>
                <View style={styles.inputContainer}>
                    <Input
                        value={search}
                        onChangeText={setSearch}
                        label="Search"
                        placeholder="Search"
                    />
                </View>
                <View style={styles.cancelContainer}>
                    <GhostButton
                        onPress={() => {
                            router.push({
                                pathname: '/stock/new',
                            });
                        }}
                    >
                        Cancel
                    </GhostButton>
                </View>
            </View>

            {search === '' ? (
                <Text>Search for a medication to use</Text>
            ) : (
                <MedicationCards
                    medications={medications}
                    onPressMedication={(id) => {
                        router.push({
                            pathname: '/stock/new',
                            params: {
                                medicationId: id,
                            },
                        });
                    }}
                />
            )}
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
    },
    inputContainer: {
        width: '80%',
    },
    cancelContainer: {},
});
