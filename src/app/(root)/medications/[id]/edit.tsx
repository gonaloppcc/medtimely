import React from 'react';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMedication } from '../../../../hooks/useMedication';
import { MedicationCard } from '../../../../components/MedicationCard';

export default function EditMedicationRecord() {
    const id = (useLocalSearchParams().id as string) || '';
    const { isLoading, isSuccess, medication } = useMedication(id);

    const onPressHandler = () => {};

    return (
        <View style={{ paddingTop: 20 }}>
            <Text variant="labelLarge">EDIT MEDICATIONN</Text>

            {isLoading && <ActivityIndicator />}

            {/* Replace this with a different medication view */}
            {isSuccess && medication !== null && (
                <MedicationCard
                    {...medication}
                    id="1"
                    onPressMedication={() => {}}
                />
            )}

            {/* TODO: Add a form to edit the medication */}

            <Button onPress={onPressHandler}>Click me!</Button>
        </View>
    );
}
