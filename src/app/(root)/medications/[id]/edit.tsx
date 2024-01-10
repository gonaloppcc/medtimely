import React from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useMedication } from '../../../../hooks/useMedication';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { MedicationCard } from '../../../../components/MedicationCard';

export default function EditMedicationRecord() {
    const id = (useLocalSearchParams().id as string) || '';
    const uid = useAuthentication().user?.uid || '';
    const { isLoading, isSuccess, medication } = useMedication(id, uid);

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
