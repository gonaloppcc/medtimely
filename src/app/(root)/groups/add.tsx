import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavOptions } from '../../../hooks/useNavOptions';

export default function GroupMemberScreen() {
    useNavOptions({
        headerTitle: 'memberName',
    });

    //const { isSuccess, isLoading, isError, medications } = useMedications('1'); // TODO: Replace with user's token

    return (
        <View style={styles.innerStyle}>
            {
                //isError && (
                //   <Text variant="headlineMedium">Something went wrong</Text>
                //)
            }
            {/*//isLoading && <ProgressIndicator />*/}
            {/*isSuccess && (
                <>
                    <MedicationCards
                        medications={medicationsFiltered}
                        onPressMedication={onPressMedication}
                    />
                </>
            )*/}
        </View>
    );
}

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
