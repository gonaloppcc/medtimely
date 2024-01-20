import React, { useEffect, useState } from 'react';
import { Button, ProgressBar, Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input } from '../../../components/Input';
import { MedicationFormDropdown } from '../../../components/MedicationFormDropdown';
import { MedicationRecordForm } from '../../../model/medicationRecord';
import * as Yup from 'yup';
import { Formik, useFormikContext } from 'formik';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { router, useLocalSearchParams } from 'expo-router';
import { useMedication } from '../../../hooks/useMedication';
import { MiniMedicationCard } from '../../../components/MiniMedicationCard';

interface Values {
    name: string;
    dosage: string;
    form: MedicationRecordForm;
    stock: string;
}

const initialValues: Values = {
    name: '',
    dosage: '',
    form: MedicationRecordForm.CAPSULE,
    stock: '0',
};

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    dosage: Yup.string(),
    form: Yup.string().oneOf(Object.values(MedicationRecordForm)),
    stock: Yup.number().integer().min(0),
});

function SelectMedication({
    setDisabled,
}: {
    setDisabled: (d: boolean) => void;
}) {
    const { medicationId } = useLocalSearchParams<{ medicationId?: string }>();
    const { medication, isSuccess, isLoading } = useMedication(medicationId);
    const { setFieldValue } = useFormikContext();

    const searchMedicationAction = () => {
        router.push('/stock/search');
    };

    useEffect(() => {
        if (isSuccess && medication) {
            setFieldValue('name', medication.name);
            setFieldValue('form', medication.form);
            setFieldValue('dosage', medication.dosage);
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [medication, isSuccess]);

    return medicationId ? (
        isLoading ? (
            <ProgressBar />
        ) : isSuccess && medication ? (
            <View>
                <Text variant="labelLarge">Currently selected medication:</Text>
                <MiniMedicationCard
                    medication={medication}
                    onPress={() =>
                        router.setParams({
                            medicationId: '',
                        })
                    }
                />
            </View>
        ) : (
            <ErrorMessage errorMessage="Error loading medication" />
        )
    ) : (
        <Button
            icon="magnify"
            mode="contained"
            style={{ alignSelf: 'center' }}
            onPress={searchMedicationAction}
        >
            Search for a medication
        </Button>
    );
}

export default function NewStockScreen() {
    // Create an _owned_ medication
    const [disabled, setDisabled] = useState(false);

    const onSubmit = async (values: Values) => {
        console.log(values);
        // todo
    };

    return (
        <ScrollView contentContainerStyle={styles.form}>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ handleChange, values, errors, touched }) => (
                    <>
                        <SelectMedication setDisabled={setDisabled} />
                        <View style={styles.inputContainer}>
                            <View style={styles.field}>
                                <Input
                                    id="name"
                                    label="Name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    disabled={disabled}
                                />
                                {touched.name && errors.name && (
                                    <ErrorMessage errorMessage={errors.name} />
                                )}
                            </View>

                            <View style={styles.field}>
                                <Input
                                    id="dosage"
                                    label="Dosage"
                                    value={values.dosage}
                                    onChangeText={handleChange('dosage')}
                                    disabled={disabled}
                                />

                                {touched.dosage && errors.dosage && (
                                    <ErrorMessage
                                        errorMessage={errors.dosage}
                                    />
                                )}
                            </View>

                            <View style={styles.field}>
                                <MedicationFormDropdown
                                    value={values.form}
                                    setValue={handleChange('form')}
                                    disabled={disabled}
                                />
                                {touched.form && errors.form && (
                                    <ErrorMessage errorMessage={errors.form} />
                                )}
                            </View>

                            <View style={styles.field}>
                                <Input
                                    id="stock"
                                    label="Stock"
                                    value={values.stock}
                                    onChangeText={handleChange('stock')}
                                    keyboardType="numeric"
                                />

                                {touched.stock && errors.stock && (
                                    <ErrorMessage errorMessage={errors.stock} />
                                )}
                            </View>
                        </View>
                    </>
                )}
            </Formik>
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
