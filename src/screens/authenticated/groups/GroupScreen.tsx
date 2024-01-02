import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TODO: This is just for now, it should be replaced with data from the database
const GROUP_INFO = {
    groupName: 'name',
    description: 'descr',
};

export function GroupScreen() {
    const navigation = useNavigation();
    const { groupName, description } = GROUP_INFO;

    const headerRight = () => (
        <Appbar.Action
            icon="pencil"
            //onPress={() => navigation.navigate('EditRecord')}
        />
    );

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: groupName,
            headerRight,
        });
    }, [navigation, groupName]);

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">{groupName}</Text>
            <Text variant="labelMedium">{description}</Text>
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
