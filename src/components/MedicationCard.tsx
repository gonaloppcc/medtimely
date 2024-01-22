import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MedicationIcon } from './MedicationIcon';
import { Medication } from '../model/medication';

type MedicationCardProps = Medication & {
    onPressMedication: (id: string) => void;
    // Add any extra props here
};
export const MedicationCard = ({
    id,
    name,
    form,
    dosage,
    activeSubstance,
    aimTitular,
    isGeneric,
    commercialisation,
    administration,
    presentations,
    onPressMedication,
}: MedicationCardProps) => {
    const theme = useTheme();

    const title = name;

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${form}, ${dosage}`;

    const onPress = () => {
        onPressMedication(id);
    };

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <MedicationIcon form={form} />
            <View style={styles.innerStyle}>
                <Text
                    variant="labelLarge"
                    style={{ color: theme.colors.onSurface }}
                >
                    {title}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {subtitle}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {activeSubstance}
                </Text>
                {aimTitular && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {aimTitular}
                    </Text>
                )}
                {commercialisation && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {commercialisation}
                    </Text>
                )}
                {isGeneric && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {isGeneric}
                    </Text>
                )}
                {administration && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {administration}
                    </Text>
                )}
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {presentations.length} presentations
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center',
        borderRadius: 5,
        padding: 12,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    innerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});
