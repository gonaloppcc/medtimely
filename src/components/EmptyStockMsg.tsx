import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Icon } from 'react-native-paper';

export const EmptyStockMsg = () => {
    const theme = useTheme();

    const COLOR = theme.colors.error;
    const size = 100;
    const iconName = 'medical-bag';

    return (
        <View style={styles.emptyStockContainer}>
            <Icon size={size} source={iconName} color={COLOR} />
            <Text variant="labelLarge" style={{ color: theme.colors.error }}>
                You dont have any medications
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyStockContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: '50%',
        gap: 10,
    },
});
