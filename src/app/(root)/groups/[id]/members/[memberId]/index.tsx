import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../../../../../components/Button';
import { useNavOptions } from '../../../../../../hooks/useNavOptions';
import { WeekDayPicker } from '../../../../../../components/WeekDayPicker';
import { router, useLocalSearchParams } from 'expo-router';
import { ROUTE } from '../../../../../../model/routes';
import { useMemberGroupById } from '../../../../../../hooks/useMemberGroupById';
import { ProgressIndicator } from '../../../../../../components/ProgressIndicator';
import { Text } from 'react-native-paper';

// TODO: In the future this should be changeable by the user
const startDay = new Date();

export default function GroupMemberScreen() {
    const localSearchParams = useLocalSearchParams();
    const groupId = localSearchParams.groupId as string;
    const memberId = localSearchParams.memberId as string;
    const { isSuccess, isLoading, isError, user } = useMemberGroupById(
        groupId,
        memberId
    );

    const day =
        (useLocalSearchParams().day as string) || new Date().toISOString();
    const initialSelectedDay = new Date(day);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);

    if (isSuccess && user)
        useNavOptions({
            headerTitle: user.firstname,
        });

    const onPressMemberMeds = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBER_MEDS });
    };

    const onPressMemberRecord = () => {
        router.push({ pathname: ROUTE.GROUPS.MEMBER_RECORDS });
    };

    const selectDay = (day: Date) => {
        setSelectedDay(day);
    };

    return (
        <View style={styles.container}>
            {isLoading && <ProgressIndicator />}
            {isError && <Text>Something went wrong</Text>}
            {isSuccess && user && (
                <>
                    <View style={styles.buttonsContainer}>
                        <PrimaryButton onPress={onPressMemberMeds}>
                            Records History
                        </PrimaryButton>
                        <PrimaryButton onPress={onPressMemberRecord}>
                            Meds
                        </PrimaryButton>
                    </View>
                    <WeekDayPicker
                        selectedDay={selectedDay}
                        selectDay={selectDay}
                        startDay={startDay}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 26,
        padding: 12,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
