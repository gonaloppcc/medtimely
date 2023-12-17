import * as React from 'react';

import {BottomNavigation, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {HomeScreen} from './HomeScreen';
import {RecordsScreen} from './RecordsScreen';
import {SettingsScreen} from './SettingsScreen';

export function MedicationsScreen() {
    return (
        <View style={styles.container}>
            <Text>Medications Screen</Text>
        </View>
    );
}

export default function MedicationsNav() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'home', title: 'Home', focusedIcon: 'home'},
        // TODO: custom icon
        {key: 'medications', title: 'Medications', focusedIcon: 'pill'},
        {key: 'records', title: 'Records', focusedIcon: 'account-circle'},
        {key: 'settings', title: 'Settings', focusedIcon: 'cog'},
    ]);
    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        medications: MedicationsScreen,
        records: RecordsScreen,
        settings: SettingsScreen,
    });
    return (
        <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
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
