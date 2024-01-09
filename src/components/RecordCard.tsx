import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MedicationRecord } from '../model/MedicationRecord';
import { medicationFormToIconName } from '../model/Medicine';

type MedCardProps = MedicationRecord & {
    // Added any extra props here
    onPress: (id: string) => void;
};
export const RecordCard = ({
    id,
    amount,
    dosage,
    form,
    missed,
    name,
    onPress,
}: MedCardProps) => {
    const theme = useTheme();

    const title = amount == null || amount == 1 ? name : `${name} (x${amount})`;

    const backgroundColor = missed
        ? theme.colors.errorContainer
        : theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${form}, ${dosage}`;

    const takenText = missed ? 'Not taken' : 'Taken';

    const onPressRecord = () => {
        //FIXME: the id cannot be null
        // id has to be defined in order to navigate to the record
        if (id == null) {
            return;
        }

        onPress(id);
    };

    return (
        <TouchableOpacity onPress={onPressRecord} style={style}>
            <Icon
                size={40}
                source={medicationFormToIconName(form)}
                color={theme.colors.onSurface}
            />
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
                    variant="labelLarge"
                    style={{ color: theme.colors.error }}
                >
                    {takenText}
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
        // borderColor: 'rgba(0,0,0,0.15)',
    },
    innerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});
