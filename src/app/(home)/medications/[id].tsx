import * as React from 'react';

import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavOptions } from '../../../hooks/useNavOptions';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useRoute } from '../../../hooks/useRoute';
import { ProgressIndicator } from '../../../components/ProgressIndicator';
import { useMedication } from '../../../hooks/useMedication';
import { MedicationIcon } from '../../../components/MedicationIcon';
import { useAppTheme } from '../../../theme';
import { useRecords } from '../../../hooks/useRecords';
import { RecordCards } from '../../../components/RecordCards';

export default function MedicationScreen({ id }) {
  const route = useRoute();
  const theme = useAppTheme();

  const uid = useAuthentication()?.uid || '';
  const { isSuccess, isLoading, isError, medication } = useMedication(
    id,
    uid
  );

  //TODO: add this screen
  const headerRight = () => (
    <Appbar.Action
      icon="pencil"
      // @ts-expect-error TODO: Fix this if possible
      onPress={() => nav.navigate('EditMedication')}
    />
  );

  useNavOptions({
    headerTitle: isSuccess ? medication!.name : 'Medication not found',
    headerRight,
  });

  const initialSelectedDay = new Date();
  const user = useAuthentication();

  //TODO: Change this to receive the last 10 records of that medicine.
  // Receiving an array with this {day, record}
  const {
    isSuccess: isSuccessRecords,
    isLoading: isLoadingRecords,
    isError: isErrorRecords,
    records,
    refetch: refetchRecords,
  } = useRecords(
    user?.uid ?? '', // TODO: Replace with user's token in the future
    initialSelectedDay
  );

  return (
    <View style={styles.container}>
      {isLoading && <ProgressIndicator />}
      {isError && <Text>Something went wrong</Text>}
      {isSuccess && medication && (
        <>
          <View style={styles.iconContainer}>
            <MedicationIcon
              form={medication.form}
              size={140}
              color={theme.colors.brandContainer}
            />
            <Text variant="headlineLarge">{medication.name}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text variant="headlineLarge">Programas</Text>
            <Text variant="labelMedium">
              {medication.amount}{' '}
              {medication.form.toLocaleLowerCase()} every day
            </Text>
            <Text variant="labelMedium">{medication.dosage} </Text>
          </View>

          <View style={styles.textContainer}>
            <Text variant="headlineLarge">Stock</Text>
            {/* Add stock info */}
          </View>

          <View style={styles.textContainer}>
            <Text variant="headlineLarge">History</Text>

            <Text variant="headlineSmall">Today</Text>
            {isLoadingRecords && <ProgressIndicator />}
            {isErrorRecords && (
              <Text variant="headlineMedium">Error</Text>
            )}
            {isSuccessRecords && (
              <RecordCards
                isRefreshing={isLoading}
                onRefresh={refetchRecords}
                records={records}
              />
            )}
          </View>
        </>
      )}
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
  iconContainer: {
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  textContainer: {
    display: 'flex',
    gap: 8,
  },
});
