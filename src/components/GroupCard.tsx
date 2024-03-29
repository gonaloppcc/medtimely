import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Group } from '../model/group';

export interface GroupCardProps extends Group {
    onPress: (id: string) => void;
}

export const GroupCard = ({
    name,
    description,
    id,
    users,
    onPress,
}: GroupCardProps) => {
    const theme = useTheme();

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const onPressGroup = () => {
        if (id) onPress(id);
    };

    return (
        <TouchableOpacity style={style} onPress={onPressGroup}>
            <Icon
                size={40}
                source="account-group"
                color={theme.colors.onSurface}
            />
            <View style={styles.innerStyle}>
                <Text
                    variant="bodyLarge"
                    style={{ color: theme.colors.onSurface }}
                >
                    {name}
                </Text>
                <Text variant="bodyMedium">{description}</Text>
                <Text
                    variant="labelMedium"
                    style={{ color: theme.colors.onSurface }}
                >
                    {users.length} member{users.length != 1 && 's'}
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
        gap: 15,
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
        gap: 4,
    },
});
