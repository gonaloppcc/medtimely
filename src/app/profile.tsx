import * as React from 'react';
import { Button, Text, Icon } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../services/auth';
import { router } from 'expo-router';
import { ROUTE } from '../model/routes';
import { useAuthentication } from '../hooks/useAuthentication';
import { useUser } from '../hooks/useUser';
import {
    getValueFromLabel,
    physicalActivityOptionsMap,
    pharmacyVisitsOptionsMap,
    medicationUseOptionsMap,
    planFollowedOptionsMap,
} from './../constants/surveyConstants';

export default function ProfileScreen() {
    const { user } = useAuthentication();

    const { userDoc } = useUser(
        user?.uid ?? '' // TODO: Replace with user's token in the future
    );

    const onPressHandlerLogOut = async () => {
        await signOut();
        router.replace('/');
    };

    const onPressHandlerSettings = async () => {
        router.push(ROUTE.SETTINGS.BASE_NAME);
    };

    return (
        <View style={styles.container}>
            <Icon size={150} source="account-circle" />

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}>First Name: </Text>
                <Text>{userDoc?.firstName}</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Last Name: </Text>
                <Text>{userDoc?.lastName}</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Job: </Text>
                <Text>{userDoc?.optionalInfo?.job}</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Height: </Text>
                <Text>{userDoc?.optionalInfo?.height} cm</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Weight: </Text>
                <Text>{userDoc?.optionalInfo?.weight} Kg</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Medication Use: </Text>
                {userDoc?.optionalInfo?.medicationUseFrequency !== undefined &&
                userDoc?.optionalInfo?.medicationUseFrequency !== '' ? (
                    <Text>
                        {getValueFromLabel(
                            userDoc?.optionalInfo?.medicationUseFrequency,
                            medicationUseOptionsMap
                        )}
                    </Text>
                ) : (
                    <Text style={styles.redText}>Not answered</Text>
                )}
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Pharmacy Visits: </Text>
                {userDoc?.optionalInfo?.pharmacyVisitsFrequency !== undefined &&
                userDoc?.optionalInfo?.pharmacyVisitsFrequency !== '' ? (
                    <Text>
                        {getValueFromLabel(
                            userDoc?.optionalInfo?.pharmacyVisitsFrequency,
                            pharmacyVisitsOptionsMap
                        )}
                    </Text>
                ) : (
                    <Text style={styles.redText}>Not answered</Text>
                )}
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Physical Activity: </Text>
                {userDoc?.optionalInfo?.physicalActivityFrequency !==
                    undefined &&
                userDoc?.optionalInfo?.physicalActivityFrequency !== '' ? (
                    <Text>
                        {getValueFromLabel(
                            userDoc?.optionalInfo?.physicalActivityFrequency,
                            physicalActivityOptionsMap
                        )}
                    </Text>
                ) : (
                    <Text style={styles.redText}>Not answered</Text>
                )}
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.labelText}> Plan Followed: </Text>
                {userDoc?.optionalInfo?.planFollowedFrequency !== undefined &&
                userDoc?.optionalInfo?.planFollowedFrequency !== '' ? (
                    <Text>
                        {getValueFromLabel(
                            userDoc?.optionalInfo?.planFollowedFrequency,
                            planFollowedOptionsMap
                        )}
                    </Text>
                ) : (
                    <Text style={styles.redText}>Not answered</Text>
                )}
            </View>

            <Button
                icon="cog"
                onPress={onPressHandlerSettings}
                mode="contained"
            >
                Settings
            </Button>

            <Button
                icon="logout"
                onPress={onPressHandlerLogOut}
                mode="contained"
            >
                Logout
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 12,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    labelText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    profileInfo: {
        flexDirection: 'row',
    },
    redText: {
        color: 'red',
    },
});
