import { Stack } from 'expo-router';

export default function RecordsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Records' }} />
        </Stack>
    );
}
