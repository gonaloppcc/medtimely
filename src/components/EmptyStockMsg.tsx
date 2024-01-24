import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useAppTheme } from '../theme';

export const EmptyStockMsg = () => {
    const theme = useAppTheme();

    const COLOR = theme.colors.brand;
    const size = 100;
    const iconName = 'medical-bag';

    return (
        <View style={styles.emptyStockContainer}>
            <Icon size={size} source={iconName} color={COLOR} />
            <Text variant="labelLarge" style={{ color: theme.colors.brand }}>
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
