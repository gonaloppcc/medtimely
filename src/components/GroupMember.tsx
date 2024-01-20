import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { User } from '../model/user';

export interface GroupMemberCardProps extends User {
    onPressGroupMember: (id: string) => void;
}

export const GroupMember = ({
    id,
    firstname,
    lastname,
    onPressGroupMember,
}: GroupMemberCardProps) => {
    const theme = useTheme();

    const backgroundColor = theme.colors.surface;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    const onPress = () => {
        if (id) onPressGroupMember(id);
    };

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Icon
                size={40}
                source="account-group"
                color={theme.colors.onSurface}
            />
            <View style={styles.innerStyle}>
                <Text
                    variant="labelLarge"
                    style={{ color: theme.colors.onSurface }}
                >
                    {`${firstname} ${lastname}`}
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
    },
    innerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});
