import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Appbar, Icon } from 'react-native-paper';
import { ROUTE } from '../../../model/routes';

export default function MedicationsLayout() {
    const CustomBackButton = () => {
        const handleBack = () => {
            router.push(ROUTE.MEDICATIONS.HOME);
        };

        return (
            <TouchableOpacity onPress={handleBack}>
                <Icon source="arrow-left" size={30} />
            </TouchableOpacity>
        );
    };

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerLeft: () => <></>,
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
                    headerLeft: () => <CustomBackButton />,
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
