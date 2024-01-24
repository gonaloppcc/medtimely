import { Stack } from 'expo-router';
import * as React from 'react';

export default function GroupIdLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerTitle: 'View group' }}
            />
            <Stack.Screen
                name="members/index"
                options={{ headerTitle: 'View Members' }}
            />
            <Stack.Screen
                name="members/[memberId]/index"
                options={{ headerTitle: 'View Member' }}
            />
            <Stack.Screen
                name="members/[memberId]/meds"
                options={{ headerTitle: 'View Medications' }}
            />
        </Stack>
    );
}
