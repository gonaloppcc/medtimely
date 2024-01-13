import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

//export interface GroupCardProps extends Group {
//    onPress: (id: string) => void;
//}

export const GroupMember = ({member}) => {
    const theme = useTheme();

    const backgroundColor = theme.colors.errorContainer;

    const style = {
        ...styles.container,
        backgroundColor,
        borderColor: theme.colors.outline,
    };

    //const onPressGroup = () => {
    //    onPress(id);
        // router.push({ pathname: '/groups/[id]', params: { id: '1' } });
    //};

    return (
        <TouchableOpacity style={style}>
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
                    {member}
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
