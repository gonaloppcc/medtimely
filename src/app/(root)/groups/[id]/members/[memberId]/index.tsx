import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';


export default function GroupMemberScreen ()  {
    const theme = useTheme();

    const backgroundColor = theme.colors.errorContainer;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };


    return (
        <TouchableOpacity style={style}>
            <View style={styles.innerStyle}>
                <Text
                    variant="labelLarge"
                    style={{ color: theme.colors.onSurface }}
                >
                    {"Hello"}
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
