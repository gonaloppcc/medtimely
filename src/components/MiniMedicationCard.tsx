import { IconButton, Text } from 'react-native-paper';
import { Medication } from '../model/medication';
import { useAppTheme } from '../theme';
import { MedicationIcon } from './MedicationIcon';
import { View, StyleSheet } from 'react-native';
import * as React from 'react';

export function MiniMedicationCard({
    medication,
    onPress,
}: {
    medication: Medication;
    onPress: () => void;
}) {
    const theme = useAppTheme();
    const outline = theme.colors.outline;
    return (
        <View
            style={{
                borderColor: outline,
                ...styles.cardContent,
            }}
        >
            <MedicationIcon form={medication.form} />
            <View style={{ flexGrow: 1, flexShrink: 1 }}>
                <Text variant="titleMedium">{medication.name}</Text>
                <Text variant="bodyMedium">{medication.activeSubstance}</Text>
            </View>
            {/* <View> */}
            <IconButton
                icon="close"
                iconColor={theme.colors.error}
                onPress={onPress}
            />
            {/* </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%',
        wdith: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: 12,
        borderWidth: 1,
        borderRadius: 16,
    },
});
