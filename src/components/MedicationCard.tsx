import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MedicationIcon } from './MedicationIcon';
import { Medication } from '../model/medication';

type MedicationCardProps = Medication & {
    // Added any extra props here
};
export const MedicationCard = ({
    name,
    activeSubstance,
    form,
    dosage,
    aimTitular,
    comercialization,
    isGeneric,
    administration,
    presentations,
}: MedicationCardProps) => {
    const theme = useTheme();
    const router = useRouter();

    const title = name;

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${form}, ${dosage}`;

    //TODO: Change this later to a dynamic id and the corret route
    const onPress = () => {
        router.push({ pathname: '/medications/[id]', params: { id: '1' } });
    };

    // FIXME: Improve the UI of this component

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
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {aimTitular}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {comercialization}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {isGeneric}
                </Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {administration}
                </Text>
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
