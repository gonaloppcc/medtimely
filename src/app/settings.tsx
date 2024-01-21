import * as React from 'react';
import { Button, Text, Portal, Modal, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../services/auth';
import {
    getAuth,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';
import { deleteUserDoc } from '../services/users';
import { db } from '../firebase';
import { router } from 'expo-router';
import { ROUTE } from '../model/routes';

export default function SettingsScreen() {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const auth = getAuth();
    const user = auth.currentUser;

    const showModal = () => setModalVisible(true);
    const hideModal = () => {
        setModalVisible(false);
        setPassword('-1');
    };

    const onPressHandlerLogOut = async () => {
        await signOut();
        router.replace('/');
    };

    const onPressHandlerDelete = async () => {
        showModal();
    };

    const onPressHandlerEditProfile = async () => {
        router.push(ROUTE.EDITPROFILE.BASE_NAME);
    };

    const handleDeleteConfirmation = async () => {
        if (user) {
            try {
                const credentials = EmailAuthProvider.credential(
                    user.email!,
                    password
                );

                await reauthenticateWithCredential(user, credentials);

                await deleteUserDoc(db, user.uid);
                await deleteUser(user);

                hideModal();
                router.replace('/');
            } catch (error) {
                console.error('Error reauthenticating user:', error);
                // Handle the error, show a user-friendly message, or redirect the user
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* TODO: Erase the buttons below when the design is ready and applied
            USE THEM INSTEAD OF THE DEFAULT BUT ADD THE ICONS*/}
            {/*
            <PrimaryButton
                onPress={() => router.push({ pathname: '/groups/1/members/1' })}
            >
                Primary Button
            </PrimaryButton>

            <SecondaryButton
                onPress={() => router.push({ pathname: '/groups/1/members/1' })}
            >
                Secondary Button
            </SecondaryButton>

            <OutlineButton onPress={() => router.push({ pathname: '/groups' })}>
                Outline Button
            </OutlineButton>

            <GhostButton onPress={() => router.push({ pathname: '/groups' })}>
                Ghost Button
            </GhostButton>

            <DestructiveButton
                onPress={() => router.push({ pathname: '/groups/1/members/1' })}
            >
                Destructive Button
            </DestructiveButton>

            <DestructiveButton onPress={onPressHandlerLogOut}>
                Logout
            </DestructiveButton>
            */}

            <Button
                icon="pencil"
                onPress={onPressHandlerEditProfile}
                mode="contained"
            >
                Edit Profile
            </Button>

            <Button
                icon="delete"
                onPress={onPressHandlerDelete}
                mode="contained"
            >
                Delete Profile
            </Button>

            <Button
                icon="logout"
                onPress={onPressHandlerLogOut}
                mode="contained"
            >
                Logout
            </Button>

            <Portal>
                <Modal
                    visible={isModalVisible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modalContainer}
                >
                    <Text>Are you sure you want to delete your account?</Text>
                    <View>
                        {password === '-1' ? (
                            <>
                                <Button onPress={hideModal}>NO</Button>
                                <Button onPress={() => setPassword('')}>
                                    YES, Enter Password
                                </Button>
                            </>
                        ) : (
                            <React.Fragment>
                                <TextInput
                                    label="Password"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry
                                />
                                <Button onPress={handleDeleteConfirmation}>
                                    Confirm Delete
                                </Button>
                            </React.Fragment>
                        )}
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 32,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
});
