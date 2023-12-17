import * as React from 'react';

import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useNav} from '../../hooks/useNav';

// TODO: This is just for now, it should be replaced with data from the database
const MEDICATION_DETAILED_RECORD = {
    name: 'Paracetamol',
    amount: 1,
    dosage: '500mg',
    form: 'Tablet',
    missed: false,
    time: '12:00',
    date: new Date(2023, 11, 17),
};

export function RecordScreen() {
    const {name, amount, dosage, form, missed, time, date} = MEDICATION_DETAILED_RECORD;

    const nav = useNav();

    const headerRight = () => <Text onPress={() => nav.navigate('Home')}>Edit</Text>;

    nav.setOptions({
        headerTitle: name,
        headerRight,
    });

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">{name}</Text>
            <Text variant="labelMedium">{dosage}</Text>
            <Text variant="labelMedium">{form}</Text>
            <Text variant="labelMedium">{amount}</Text>
            <Text variant="labelMedium">{time}</Text>
            <Text variant="labelMedium">{date.toDateString()}</Text>
            <Text variant="labelMedium">{missed ? 'Missed' : 'Taken'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
});
