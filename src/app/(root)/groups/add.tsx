import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { PrimaryButton } from '../../../components/Button';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { GroupData } from '../../../model/group';
import { router } from 'expo-router';
import { ROUTE } from '../../../model/routes';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useCreateGroup } from '../../../hooks/useCreateGroup';

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
    const theme = useTheme();
    const [errorCreate, setErroCreate] = useState(false);

    const onSuccess = (groupId: string) => {
        router.push({ pathname: ROUTE.GROUPS.BY_ID, params: { id: groupId } });
    };

    const onError = () => {
        setErroCreate(true);
    };

    const { createGroup } = useCreateGroup(uid, onSuccess, onError);

    const onSubmit = async (values: Values) => {
        const group: GroupData = {
            name: values.name,
            description: values.description,
            hasSharedStock: true,
            treatmentPermissions: 'manage',
        };
        await createGroup(group);
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

                            {errorCreate && (
                                <View style={styles.ErrorMessage}>
                                    <Text
                                        variant="bodyLarge"
                                        style={{
                                            color: theme.colors.errorContainer,
                                        }}
                                    >
                                        Something went wrong
                                    </Text>
                                </View>
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
    ErrorMessage: {
        marginTop: 20,
    },
});
