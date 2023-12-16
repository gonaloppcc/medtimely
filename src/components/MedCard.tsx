import React from 'react';
import {Icon, Text, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {MedicationRecord} from '../model/MedicationRecord';

type MedCardProps = MedicationRecord & {
    // Added any extra props here
};
const MedCard = ({amount, dosage, form, missed, name}: MedCardProps) => {
    const theme = useTheme();

    const title = (amount == null || amount == 1) ? name : `${name} (x${amount})`;

    const backgroundColor = missed ? theme.colors.errorContainer : theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor
    };

    const subtitle = `${form}, ${dosage}`;

    const takenText = missed ? 'Not taken' : 'Taken';

    const takenColor = missed ? theme.colors.error : 'black';

    return (
        <View
            style={style}>
            <Icon size={40} source="pill" color={theme.colors.onSurface}/>
            <View style={styles.innerStyle}>
                <Text variant="labelLarge" style={{color: theme.colors.onSurface}}>{title}</Text>
                <Text variant="labelMedium" style={{color: theme.colors.onSurface}}>{subtitle}</Text>
                <Text variant="labelLarge" style={{color: takenColor}}>{takenText}</Text>

            </View>

        </View>
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
        borderColor: 'rgba(0,0,0,0.15)',

    },
    innerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});

export default MedCard;
