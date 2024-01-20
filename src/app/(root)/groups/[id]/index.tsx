import * as React from 'react';

import { ProgressBar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { PrimaryButton } from '../../../../components/Button';
import { ROUTE } from '../../../../model/routes';
import { useGroup } from '../../../../hooks/useGroup';
import { ErrorMessage } from '../../../../components/ErrorMessage';

export interface GroupCardProps {
    onPress: (id: string) => void;
}

export default function GroupScreen() {
    const id = useLocalSearchParams<{ id: string }>().id!;
    const { isSuccess, isLoading, isError, error, group } = useGroup(id);
    const nav = useNavigation();
    React.useEffect(() => {
        if (isSuccess) {
            nav.setOptions({
                headerTitle: group.name,
            });
        }
    }, [nav, isSuccess]);

    const onPressMembers = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBERS, params: { id } });
    };

    if (isLoading) {
        return <ProgressBar />;
    } else if (isError) {
        return <ErrorMessage errorMessage={error.message} />;
    } else if (isSuccess && group) {
        const {
            name,
            description,
            sharedMeds,
            hasSharedStock,
            treatmentPermissions,
        } = group;

        return (
            <View style={styles.container}>
                <Text variant="headlineMedium">{name}</Text>
                <Text variant="labelMedium">{description}</Text>
                <Text variant="labelMedium">{sharedMeds}</Text>
                <Text variant="labelMedium">{treatmentPermissions}</Text>
                <Text variant="labelMedium">{hasSharedStock}</Text>
                <PrimaryButton onPress={onPressMembers}>
                    See group members{' '}
                </PrimaryButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
