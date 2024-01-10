import React from 'react';
import { Appbar } from 'react-native-paper';
import { signOut } from '../services/auth';
import { useAuthentication } from '../hooks/useAuthentication';
import { router } from 'expo-router';

export const ProfileHeader = () => {
    const { user } = useAuthentication();
    if (user) {
        const onProfilePress = async () => {
            await signOut();

            router.push('/Login');
            // FIXME: This should be automatic as it is said in the react native navigation docs: https://reactnavigation.org/docs/auth-flow
        };

        return <Appbar.Action icon="account-circle" onPress={onProfilePress} />;
    } else {
        return null;
    }
};
