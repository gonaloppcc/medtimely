import React from 'react';
import { Appbar } from 'react-native-paper';
import {signOut} from '../services/auth';
import {useAuthentication} from '../hooks/useAuthentication';

export const ProfileHeader = () => {
    const user = useAuthentication();
    if (user) {
        const onProfilePress = async () => {
            alert(user.email);
            await signOut();
        };

        return <Appbar.Action icon="account-circle" onPress={onProfilePress}/>;
    } else {
        return null;
    }
};
