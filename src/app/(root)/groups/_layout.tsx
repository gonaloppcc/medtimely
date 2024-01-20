import React from 'react';
import { Stack } from 'expo-router';

export default function GroupsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Groups' }} />
            <Stack.Screen name="new" options={{ title: 'New group' }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}
