import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text, useTheme } from 'react-native-paper';

export const EmptyPlannedMedications = () => {
    const theme = useTheme();

    const COLOR = theme.colors.error;
    const size = 100;
    const iconName = 'medical-bag';

    return (
        <View style={styles.container}>
            <Icon size={size} source={iconName} color={COLOR} />
            <Text variant="labelLarge" style={{ color: theme.colors.error }}>
                You dont have any planned medications
            </Text>

            <Button
                onPress={() => {
                    router.push('/medications/new');
                }}
            >
                Add a planned medication
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 10,
    },
});
