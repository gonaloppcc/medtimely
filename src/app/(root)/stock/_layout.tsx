import React from 'react';
import { Stack } from 'expo-router';

export default function StockLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Stock' }} />
            <Stack.Screen name="add" options={{ title: 'New medication' }} />
            <Stack.Screen
                name="search"
                options={{
                    presentation: 'modal',
                    title: 'Search for medication',
                }}
            />
        </Stack>
    );
}
