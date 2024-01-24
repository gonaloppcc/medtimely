import React from 'react';
import { Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
// import { useMedication } from '../../../../hooks/useMedication';
// import { PlannedMedicationCard } from '../../../../components/PlannedMedicationCard';

export default function EditMedicationRecord() {
    const id = (useLocalSearchParams().id as string) || '';
    console.log('id: ', id);
    // const { isLoading, isSuccess, medication } = useMedication(id);

    const onPressHandler = () => {};

    return (
        <View style={{ paddingTop: 20 }}>
            <Text variant="labelLarge">EDIT MEDICATION</Text>

            {/* {isLoading && <ActivityIndicator />} */}

            {/* TODO: Add a form to edit the medication */}

            <Button onPress={onPressHandler}>Click me!</Button>
        </View>
    );
}
