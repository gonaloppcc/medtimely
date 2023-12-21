import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNav } from '../hooks/useNav';
import { Medicine } from '../model/Medicine';

type MedCardProps = Medicine & {
    // Added any extra props here
};
export const MedicationCard = ({
    amount,
    dosage,
    form,
    name,
}: MedCardProps) => {
    const theme = useTheme();
    const nav = useNav();

    const title = amount == null || amount == 1 ? name : `${name} (x${amount})`;

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const subtitle = `${form}, ${dosage}`;


    const onPress = () => {subtitle
        nav.navigate('Record', { id: '1' });
    };

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Icon size={40} source="pill" color={theme.colors.onSurface} />
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
                    {amount} times a day
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
