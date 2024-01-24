import React from 'react';
import { Stack } from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function GroupsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Groups' }} />
            <Stack.Screen name="add" options={{ title: 'New group' }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}
