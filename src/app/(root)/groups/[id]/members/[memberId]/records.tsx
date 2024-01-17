import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../../../../hooks/useNavOptions';

export default function GroupMemberScreen() {
    const theme = useTheme();

    useNavOptions({
        headerTitle: 'memberName',
    });

    return (
        <View style={styles.innerStyle}>
            <Text
                variant="labelLarge"
                style={{ color: theme.colors.onSurface }}
            >
                {'Hello'}
            </Text>
        </View>
    );
}

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
