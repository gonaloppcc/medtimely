import React from 'react';
import { Stack, router } from 'expo-router';
import { Appbar } from 'react-native-paper';

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function MedicationsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Medications',
                    headerRight: () => (
                        <Appbar.Action
                            onPress={() => {
                                router.push('/medications/new');
                            }}
                            icon="plus"
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="[id]/index"
                options={{
                    title: 'Medication',
                }}
            />
            <Stack.Screen
                name="new"
                options={{
                    title: 'New',
                }}
            />
        </Stack>
    );
}
