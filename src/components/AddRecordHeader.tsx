import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const AddRecordHeader = () => {
    const navigation = useNavigation();
    return (
        <Appbar.Action
            icon="plus"
            // @ts-expect-error FIXME: Fix this if possible
            onPress={() => navigation.navigate('CreateRecord')}
        />
    );
};
