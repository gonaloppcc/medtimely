import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const Input = (props: TextInputProps) => {
    return <TextInput style={styles.input} mode="outlined" {...props} />;
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
    },
});
