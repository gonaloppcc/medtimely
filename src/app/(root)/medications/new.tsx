import { Formik, useFormikContext } from 'formik';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { Text, Button, Switch, ProgressBar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { PrimaryButton } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useOwnedMedication } from '../../../hooks/useOwnedMedication';
import { MiniMedicationCard } from '../../../components/MiniMedicationCard';
import { PlannedMedicationSchedule } from '../../../model/ownedMedication';
import { useCreatePlannedMedication } from '../../../hooks/useCreatePlannedMedication';

/// Requirements:
/// Ask for:
/// - Owned medication picker
/// - Doses to be taken
/// - Start date (default: today, maybe don't need to ask?)
/// - End date (optional)
/// - Time between doses (in hours)

interface Values {
    ownedMedicationId?: string;
    numberOfDoses?: string;
    startDate?: Date;
    startTime?: { hours: number; minutes: number };
    timeBetweenDoses?: string;
    endDate?: Date;
    runIndefinitely: boolean;
}

const validationSchema = Yup.object<Values>({
    ownedMedicationId: Yup.string().required('Owned medication is required'),
    numberOfDoses: Yup.number()
        .min(1, 'Number of doses must be at least 1')
        .integer('Number of doses must be whole')
        .required('Number of doses is required'),
    startDate: Yup.date()
        .required('Start date is required')
        .typeError('Invalid date'),
    endDate: Yup.date()
        .when('runIndefinitely', (runIndefinitely, schema) => {
            if (!runIndefinitely)
                return schema.required('End date is required');
            return schema;
        })
        .typeError('Invalid date'),
    startTime: Yup.object()
        .shape({
            hours: Yup.number().min(0),
            minutes: Yup.number().min(0).max(59),
        })
        .required('Start time is required'),

    timeBetweenDoses: Yup.number()
        .positive()
        .required('Time between doses is required'),
    runIndefinitely: Yup.boolean(),
});

const MedicationCard = () => {
    // const uid = useAuthentication().user!.uid;
    const { selectedMedicationId } = useLocalSearchParams<{
        selectedMedicationId: string;
    }>();
    const { isError, isLoading, isSuccess, ownedMedication, error } =
        useOwnedMedication(selectedMedicationId);
    const { setFieldValue } = useFormikContext<Values>();
    React.useEffect(() => {
        if (isSuccess) setFieldValue('ownedMedicationId', selectedMedicationId);
        else setFieldValue('ownedMedicationId', undefined);
    }, [selectedMedicationId, isSuccess]);

    if (!selectedMedicationId) {
        return (
            <Button
                icon="magnify"
                mode="contained"
                style={{ alignSelf: 'center', borderRadius: 5 }}
                onPress={() => {
                    router.push('/medications/search');
                }}
            >
                Search for a medication
            </Button>
        );
    }

    if (isSuccess && ownedMedication) {
        return (
            <MiniMedicationCard
                medication={ownedMedication}
                onPress={() => {
                    router.setParams({ selectedMedicationId: '' });
                }}
            />
        );
    } else {
        if (isLoading) return <ProgressBar />;
        if (isError) return <ErrorMessage errorMessage={error.message} />;
    }
};

export default function NewPlannedMedicationScreen() {
    const initialValues: Values = {
        numberOfDoses: '1',
        runIndefinitely: true,
        timeBetweenDoses: '24',
    };

    const uid = useAuthentication().user!.uid;

    const onSuccessCreate = () => {
        router.replace('/medications');
    };

    const onErrorCreate = () => {};

    const { createPlannedMedication } = useCreatePlannedMedication(
        uid,
        onSuccessCreate,
        onErrorCreate
    );

    const onSubmit = async (values: Values) => {
        const ownedMedicationId = values.ownedMedicationId!;
        const doseToBeTaken = Number.parseInt(values.numberOfDoses!);
        const date = values.startDate!;
        date?.setHours(values.startTime!.hours);
        date?.setMinutes(values.startTime!.minutes);

        const intervalHours = Number.parseFloat(values.timeBetweenDoses!);

        const schedule: PlannedMedicationSchedule = {
            startDate: date,
            timeBetweenDosesInHours: intervalHours,
        };

        if (!values.runIndefinitely) {
            schedule.endDate = values.endDate;
        }

        console.log(schedule);

        await createPlannedMedication(
            { schedule, doseToBeTaken },
            ownedMedicationId
        );
    };

    const [startTimeVisible, setStartTimeVisible] = React.useState(false);
    // const [intervalVisible, setIntervalVisible] = React.useState(false);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
            }) => (
                <ScrollView contentContainerStyle={styles.form}>
                    <Text variant="headlineMedium">
                        Create a new planned medication
                    </Text>

                    <MedicationCard />

                    <View>
                        <Text variant="labelLarge">Number of doses</Text>
                        <Input
                            label="Number of doses"
                            keyboardType="numeric"
                            onChangeText={handleChange('numberOfDoses')}
                            onBlur={handleBlur('numberOfDoses')}
                        />
                        {touched.numberOfDoses && errors.numberOfDoses && (
                            <ErrorMessage
                                errorMessage={errors.numberOfDoses.toString()}
                            />
                        )}
                    </View>

                    <View>
                        <Text variant="labelLarge">Start date</Text>

                        <DatePickerInput
                            locale="en"
                            value={values.startDate}
                            onChange={(date) => {
                                setFieldValue('startDate', date);
                                setFieldTouched('startDate', true);
                            }}
                            inputMode="start"
                            mode="outlined"
                            withDateFormatInLabel={false}
                        />

                        {touched.startDate && errors.startDate && (
                            <ErrorMessage
                                errorMessage={errors.startDate.toString()}
                            />
                        )}
                    </View>

                    <View>
                        <Text variant="labelLarge">Start hour</Text>

                        <Button
                            onPress={() => setStartTimeVisible(true)}
                            mode="contained-tonal"
                        >
                            {values.startTime
                                ? `${values.startTime.hours
                                      .toString()
                                      .padStart(
                                          2,
                                          '0'
                                      )}:${values.startTime.minutes
                                      .toString()
                                      .padStart(2, '0')}`
                                : 'Set time'}
                        </Button>
                        <TimePickerModal
                            visible={startTimeVisible}
                            hours={values.startTime?.hours}
                            minutes={values.startTime?.minutes}
                            onDismiss={() => {
                                setStartTimeVisible(false);
                            }}
                            onConfirm={({ hours, minutes }) => {
                                setFieldTouched('startTime', true);
                                setFieldValue('startTime', { hours, minutes });
                                setStartTimeVisible(false);
                            }}
                        />

                        {touched.startTime && errors.startTime && (
                            <ErrorMessage
                                errorMessage={errors.startTime.toString()}
                            />
                        )}
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text variant="labelLarge">Run indefinitely</Text>
                        <Switch
                            value={values.runIndefinitely}
                            onValueChange={() => {
                                setFieldValue(
                                    'runIndefinitely',
                                    !values.runIndefinitely
                                );
                                setFieldTouched('runIndefinitely', true);
                            }}
                        />
                    </View>

                    {!values.runIndefinitely && (
                        <View>
                            <Text variant="labelLarge">End date</Text>

                            <DatePickerInput
                                locale="en"
                                value={values.endDate}
                                onChange={(date) => {
                                    setFieldValue('endDate', date);
                                    setFieldTouched('endDate', true);
                                }}
                                inputMode="end"
                                mode="outlined"
                                withDateFormatInLabel={false}
                            />

                            {touched.endDate && errors.endDate && (
                                <ErrorMessage
                                    errorMessage={errors.endDate.toString()}
                                />
                            )}
                        </View>
                    )}

                    <View>
                        <Text variant="labelLarge">
                            Time between doses (in hours)
                        </Text>

                        <Input
                            label="Time between doses"
                            keyboardType="numeric"
                            onChangeText={handleChange('timeBetweenDoses')}
                            onBlur={handleBlur('timeBetweenDoses')}
                        />

                        {touched.timeBetweenDoses &&
                            errors.timeBetweenDoses && (
                                <ErrorMessage
                                    errorMessage={errors.timeBetweenDoses.toString()}
                                />
                            )}
                    </View>

                    <PrimaryButton onPress={handleSubmit} fullWidth>
                        Create
                    </PrimaryButton>
                </ScrollView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 22,
        paddingBottom: 0,
        display: 'flex',
        gap: 20,
    },
});
