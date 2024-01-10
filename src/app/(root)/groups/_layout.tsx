import React from 'react';
import { Stack } from 'expo-router';

export default function GroupsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Groups' }} />
        </Stack>
    );
}
