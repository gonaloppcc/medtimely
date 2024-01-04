import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useCreateRecord } from '../../../hooks/useCreateRecord';
import {
    MedicationRecord,
    MedicationRecordForm,
} from '../../../model/MedicationRecord';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useNav } from '../../../hooks/useNav';
import { useFormik } from 'formik';
import { useAppTheme } from '../../../theme';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../hooks/ErrorMessage';
import { Switch } from '../../../components/Switch';
import { Picker } from '../../../components/Picker';
import { useNavOptions } from '../../../hooks/useNavOptions';
import { useAuthentication } from '../../../hooks/useAuthentication';

interface Values {
    name: string;
    amount: number;
    dosage: string;
    form: MedicationRecordForm;
    missed: boolean;
    scheduledTime: Date;
}

const initialValues: Values = {
    name: '',
    amount: 1,
    dosage: '',
    form: MedicationRecordForm.TABLET,
    missed: false,
    scheduledTime: new Date(),
};

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    amount: Yup.number().required('Required'),
    dosage: Yup.string().required('Required'),
    form: Yup.string().required('Required'),
    missed: Yup.boolean().required('Required'),
    time: Yup.string().required('Required'),
});

export default function CreateRecordScreen() {
    const [submitErrorMessage, setSubmitErrorMessage] =
        React.useState<string>('');
    const nav = useNav();
    const theme = useAppTheme();
    const uid = useAuthentication()?.uid || '';
    const { createRecord } = useCreateRecord(
        uid,
        (newRecord) => {
            // Pass the time as a string to the home screen
            try {
                nav.push('Home', {
                    day: newRecord.scheduledTime.toISOString(),
                }); // Push is needed in order to refresh the home screen state

                console.log('updated');
            } catch (error) {
                console.log(error);
                setSubmitErrorMessage(
                    'Something went wrong while navigating back to the home screen'
                );
            }
        },
        () => {
            console.log('error');
        }
    );

    useNavOptions({
        headerTitle: 'Add Record',
    });

    const onSubmit = async (values: Values) => {
        const newRecord: MedicationRecord = { ...values };

        console.log('newRecord: ' + JSON.stringify(newRecord));

        try {
            await createRecord(newRecord);
        } catch (error) {
            const errorMessage =
                (error.message as string) || 'Something went wrong';
            setSubmitErrorMessage(errorMessage);
        }
    };

    const {
        values,
        isValid,
        isSubmitting,
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        touched,
    } = useFormik<Values>({
        initialValues,
        validationSchema: schema,
        onSubmit,
    });

    return (
        <ScrollView contentContainerStyle={styles.form}>
            {/* TODO: Add a form to create the record */}
            <View style={styles.inputContainer}>
                <View style={styles.field}>
                    <Text>Medication Name</Text>
                    <Input
                        id="name"
                        label="Name"
                        placeholder=""
                        value={values.name}
                        onChangeText={handleChange('name')}
                    />
                    {touched.name && errors.name && (
                        <ErrorMessage errorMessage={errors.name} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>Medication Amount (e.g. Number of Pills)</Text>
                    <Input
                        id="amount"
                        label="Amount"
                        placeholder=""
                        keyboardType="numeric"
                        value={values.amount.toString()}
                        onChangeText={handleChange('amount')}
                    />
                    {touched.amount && errors.amount && (
                        <ErrorMessage errorMessage={errors.amount} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>Medication Dosage (e.g. How much in each Pill)</Text>
                    <Input
                        id="dosage"
                        label="Dosage"
                        placeholder=""
                        value={values.dosage}
                        onChangeText={handleChange('dosage')}
                    />
                    {touched.dosage && errors.dosage && (
                        <ErrorMessage errorMessage={errors.dosage} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>
                        Medication Form - How do you take this medication? (e.g.
                        Tablet, Capsule, Liquid, etc.)
                    </Text>
                    <Picker
                        selectedValue={values.form}
                        onValueChange={handleChange('form')}
                        label="Medication form"
                        items={[
                            // TODO: Make this a constant
                            { label: 'Tablet', value: 'TABLET' },
                            { label: 'Capsule', value: 'CAPSULE' },
                            { label: 'Liquid', value: 'LIQUID' },
                            { label: 'Injection', value: 'INJECTION' },
                            { label: 'Inhaler', value: 'INHALER' },
                            { label: 'Patch', value: 'PATCH' },
                            { label: 'Suppository', value: 'SUPPOSITORY' },
                            { label: 'Other', value: 'OTHER' },
                        ]}
                    />
                    {touched.form && errors.form && (
                        <ErrorMessage errorMessage={errors.form} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>Did you not take the medication?</Text>
                    <Switch
                        id="missed"
                        value={values.missed}
                        onValueChange={(value) => {
                            setFieldValue('missed', value);
                            return;
                        }}
                    />
                    {touched.missed && errors.missed && (
                        <ErrorMessage errorMessage={errors.missed} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>When did you take the medication?</Text>
                    <Input
                        // TODO: Change this to a date picker
                        id="time"
                        label="Time"
                        placeholder=""
                        value={values.scheduledTime.toString()}
                        onChangeText={handleChange('time')}
                    />
                    {touched.scheduledTime && errors.scheduledTime && (
                        <ErrorMessage errorMessage={'Error in Time'} />
                    )}
                </View>
            </View>

            {submitErrorMessage && (
                <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                    {submitErrorMessage}
                </Text>
            )}
            <Button
                disabled={!isValid}
                isLoading={isSubmitting}
                onPress={handleSubmit}
            >
                Add Record
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20,
        width: '100%',
        padding: 22,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
        width: '100%',
    },
    field: {
        width: '100%',
    },
});
