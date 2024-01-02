import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Group } from '../../../model/group';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useNav } from '../../../hooks/useNav';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../hooks/ErrorMessage';
import { useCreateGroup } from '../../../hooks/useCreateGroup';

interface Values {
    groupName: string;
    description: string;
}

const initialValues: Values = {
    groupName: '',
    description: '',
};

const schema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
});

export const CreateGroupScreen = () => {
    const [, setSubmitErrorMessage] = React.useState<string>('');
    const nav = useNav();
    const { createGroup } = useCreateGroup(
        '1', // TODO: Replace with user id in the future
        () => {
            console.log('updated');
        },
        () => {
            console.log('error');
        }
    );

    // nav.setOptions({
    //    headerTitle: 'Add Group',
    //});

    const onSubmit = async (values: Values) => {
        const newGroup: Group = { ...values };

        console.log('newGroup: ' + JSON.stringify(newGroup));

        try {
            await createGroup(newGroup);
            nav.push('GroupsScreen');
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
        errors,
        touched,
    } = useFormik<Values>({
        initialValues,
        validationSchema: schema,
        onSubmit,
    });

    return (
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <View style={styles.field}>
                    <Text>Group Name</Text>
                    <Input
                        id="groupName"
                        label="GroupName"
                        placeholder=""
                        value={values.groupName}
                        onChangeText={handleChange('groupName')}
                    />
                    {touched.groupName && errors.groupName && (
                        <ErrorMessage errorMessage={errors.groupName} />
                    )}
                </View>
                <View style={styles.field}>
                    <Text>Group Description</Text>
                    <Input
                        id="groupDescription"
                        label="GroupDescription"
                        placeholder=""
                        value={values.description}
                        onChangeText={handleChange('description')}
                    />
                    {touched.description && errors.description && (
                        <ErrorMessage errorMessage={errors.description} />
                    )}
                </View>
            </View>
            <Button
                disabled={!isValid}
                isLoading={isSubmitting}
                onPress={handleSubmit}
            >
                Add Group
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20,
        width: '100%',
        padding: 22,
        height: '100%',
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
