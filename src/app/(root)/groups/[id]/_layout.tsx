import { Stack } from 'expo-router';
import * as React from 'react';

export default function GroupIdLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerTitle: 'View group' }}
            />
        </Stack>
    );
}
