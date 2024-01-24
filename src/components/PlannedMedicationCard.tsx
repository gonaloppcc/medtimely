import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MedicationIcon } from './MedicationIcon';
import { PlannedMedication } from '../model/ownedMedication';

type MedicationCardProps = PlannedMedication & {
    onPressMedication: (id: string) => void;
    // Add any extra props here
};
export const PlannedMedicationCard = ({
    ownedMedication,
    onPressMedication,
}: MedicationCardProps) => {
    const theme = useTheme();

    const title = ownedMedication.name;

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${ownedMedication.form}, ${ownedMedication.dosage}`;

    const onPress = () => {
        onPressMedication(ownedMedication.id);
    };

    // FIXME: Improve the UI of this component

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <MedicationIcon form={ownedMedication.form} />
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
                    {ownedMedication.activeSubstance}
                </Text>
                {ownedMedication.aimTitular && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {ownedMedication.aimTitular}
                    </Text>
                )}
                {ownedMedication.commercialisation && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {ownedMedication.commercialisation}
                    </Text>
                )}
                {ownedMedication.isGeneric && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {ownedMedication.isGeneric}
                    </Text>
                )}
                {ownedMedication.administration && (
                    <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurface }}
                    >
                        {ownedMedication.administration}
                    </Text>
                )}
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {ownedMedication.presentations.length} presentations
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
