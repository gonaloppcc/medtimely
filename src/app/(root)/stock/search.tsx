import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MedicationCards } from '../../../components/MedicationCards';
import { useMedicationsByName } from '../../../hooks/useMedicationsByName';
import { useState } from 'react';
import { Input } from '../../../components/Input';
import * as React from 'react';
import { router } from 'expo-router';

export default function SearchModal() {
    const [search, setSearch] = useState('');

    const { medications, refetch } = useMedicationsByName(search);

    // TODO: Refetch after holding for a bit
    return (
        <View style={styles.form}>
            <Input
                value={search}
                onChangeText={setSearch}
                label="Search"
                onSubmitEditing={refetch}
            />

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
        display: 'flex',
        gap: 20,
        width: '100%',
        padding: 12,
    },
});
