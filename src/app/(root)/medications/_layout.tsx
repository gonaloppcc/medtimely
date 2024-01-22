import React from 'react';
import { Stack } from 'expo-router';

export default function MedicationsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Medications' }} />
            <Stack.Screen name="[id]/index" options={{ title: 'Medication' }} />
        </Stack>
    );
}
