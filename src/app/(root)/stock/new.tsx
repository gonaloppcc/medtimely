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
import { GroupPicker } from '../../../components/GroupPicker';
import { PrimaryButton } from '../../../components/Button';
import { createOwnedMedication } from '../../../services/ownedMedication';
import { db } from '../../../firebase';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { OwnedMedicationData } from '../../../model/ownedMedication';

interface Values {
    medicationId?: string;
    name: string;
    dosage: string;
    form: MedicationRecordForm;
    stock: string;
    groupId: string;
}

const initialValues: Values = {
    name: '',
    dosage: '',
    form: MedicationRecordForm.CAPSULE,
    stock: '0',
    groupId: '',
    medicationId: undefined,
};

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    dosage: Yup.string(),
    form: Yup.string().oneOf(Object.values(MedicationRecordForm)),
    stock: Yup.number().integer().min(0),
    groupId: Yup.string(),
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
            setFieldValue('medicationId', medicationId);
            setDisabled(true);
        } else {
            setFieldValue('medicationId', undefined);
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
            style={{ alignSelf: 'center', borderRadius: 5 }}
            onPress={searchMedicationAction}
        >
            Search for a medication
        </Button>
    );
}

export default function NewStockScreen() {
    // Create an _owned_ medication
    const [disabled, setDisabled] = useState(false);
    const uid = useAuthentication().user?.uid || '';

    const onSubmit = async (values: Values) => {
        const med: OwnedMedicationData = {
            medicationId: values.medicationId,
            form: values.form,
            dosage: values.dosage,
            name: values.name,
            stock: Number.parseInt(values.stock),
            presentations: [],
        };

        if (values.groupId && values.groupId !== '') {
            // TODO
        } else {
            // TODO: Navigate to medication page
            await createOwnedMedication(db, uid, med);
            router.replace('/stock');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
                touched,
            }) => (
                <ScrollView contentContainerStyle={styles.form}>
                    <Text variant="headlineMedium">
                        Add a new medication to your stock
                    </Text>
                    <View style={styles.medicationField}>
                        <SelectMedication setDisabled={setDisabled} />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.field}>
                            <Text variant="labelLarge">Name</Text>
                            <Input
                                id="name"
                                label="Name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                disabled={disabled}
                            />
                            {touched.name && errors.name && (
                                <ErrorMessage errorMessage={errors.name} />
                            )}
                        </View>

                        <View style={styles.field}>
                            <Text variant="labelLarge">Dosage</Text>
                            <Input
                                id="dosage"
                                label="Dosage"
                                value={values.dosage}
                                onChangeText={handleChange('dosage')}
                                onBlur={handleBlur('dosage')}
                                disabled={disabled}
                            />

                            {touched.dosage && errors.dosage && (
                                <ErrorMessage errorMessage={errors.dosage} />
                            )}
                        </View>

                        <View style={styles.field}>
                            <Text variant="labelLarge">Form</Text>
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
                            <Text variant="labelLarge">Stock</Text>
                            <Input
                                id="stock"
                                label="Stock"
                                value={values.stock}
                                onChangeText={handleChange('stock')}
                                keyboardType="numeric"
                                onBlur={handleBlur('stock')}
                            />

                            {touched.stock && errors.stock && (
                                <ErrorMessage errorMessage={errors.stock} />
                            )}
                        </View>

                        <View style={styles.field}>
                            <Text variant="labelLarge">Group</Text>
                            <GroupPicker
                                value={values.groupId}
                                setValue={handleChange('groupId')}
                            />
                        </View>
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20,
        width: '100%',
        padding: 22,
    },
    medicationField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
        width: '100%',
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },
});
