import React from 'react';
import { Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input } from '../../../components/Input';
import { MedicationFormDropdown } from '../../../components/MedicationFormDropdown';
import { MedicationRecordForm } from '../../../model/medicationRecord';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ErrorMessage } from '../../../components/ErrorMessage';

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

export default function NewStockScreen() {
    // Create an _owned_ medication

    const onSubmit = async (values: Values) => {
        console.log(values);
        // todo
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

    // TODO: FINISH THIS FORM
    console.log(
        isValid,
        isSubmitting,
        errors,
        touched,
        handleSubmit,
        setFieldValue
    );

    return (
        <ScrollView contentContainerStyle={styles.form}>
            <View style={styles.inputContainer}>
                <View style={styles.field}>
                    <Text>Name</Text>
                    <Input
                        id="name"
                        label="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                    />
                    {touched.name && errors.name && (
                        <ErrorMessage errorMessage={errors.name} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>Dosage</Text>
                    <Input
                        id="dosage"
                        label="Dosage"
                        value={values.dosage}
                        onChangeText={handleChange('dosage')}
                    />

                    {touched.dosage && errors.dosage && (
                        <ErrorMessage errorMessage={errors.dosage} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>Form</Text>
                    <MedicationFormDropdown
                        value={values.form}
                        setValue={handleChange('form')}
                    />
                    {touched.form && errors.form && (
                        <ErrorMessage errorMessage={errors.form} />
                    )}
                </View>

                <View style={styles.field}>
                    <Text>Stock</Text>
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
