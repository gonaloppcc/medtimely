import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { PrimaryButton } from '../../../components/Button';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { createGroup } from '../../../services/groups';
import { db } from '../../../firebase';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { GroupData } from '../../../model/group';
import { router } from 'expo-router';
import { ROUTE } from '../../../model/routes';
import { TextInput } from 'react-native-paper';

interface Values {
    name: string;
    description: string;
}

const initialValues: Values = {
    name: '',
    description: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string().min(1).required('Required'),
    description: Yup.string(),
});

export default function GroupMemberScreen() {
    const uid = useAuthentication().user?.uid || '';
    const onSubmit = async (values: Values) => {
        const group: GroupData = {
            name: values.name,
            description: values.description,
            sharedMeds: [],
            hasSharedStock: true,
            treatmentPermissions: 'manage',
        };
        const groupId = await createGroup(db, group, uid);
        router.push({ pathname: ROUTE.GROUPS.BY_ID, params: { id: groupId } });
    };

    return (
        <ScrollView contentContainerStyle={styles.form}>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <>
                        <View style={styles.field}>
                            <TextInput
                                placeholder="Group Name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                label="Group Name"
                            />

                            {touched.name && errors.name && (
                                <ErrorMessage errorMessage={errors.name} />
                            )}
                        </View>

                        <View style={styles.field}>
                            <TextInput
                                placeholder="Description"
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                label="Description"
                            />

                            {touched.description && errors.description && (
                                <ErrorMessage
                                    errorMessage={errors.description}
                                />
                            )}
                        </View>

                        <PrimaryButton onPress={handleSubmit}>
                            Create group
                        </PrimaryButton>
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
    field: {
        width: '100%',
    },
});
