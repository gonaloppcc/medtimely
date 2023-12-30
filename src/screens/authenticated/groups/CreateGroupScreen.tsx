import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Group } from '../../../model/group';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useNav } from '../../../hooks/useNav';
import { useFormik } from 'formik';
import { useAppTheme } from '../../../theme';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../hooks/ErrorMessage';
import { useCreateGroup } from '../../../hooks/useCreateGroup';

interface Values {
    groupName: string;
    groupDescription: string;
}

const initialValues: Values = {
    groupName: '',
    groupDescription: ''
};

const schema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    groupDescription: Yup.string().required('Required')
});

export const CreateGroupScreen = () => {
    const [submitErrorMessage, setSubmitErrorMessage] =
        React.useState<string>('');
    const nav = useNav();
    const theme = useAppTheme();
    const { createGroup } = useCreateGroup(
        '1', // TODO: Replace with user id in the future
        () => {
            console.log('updated');
        },
        () => {
            console.log('error');
        }
    );

    nav.setOptions({
        headerTitle: 'Add Group',
    });

    const onSubmit = async (values: Values) => {
        const newGroup: Group = { ...values };

        console.log('newGroup: ' + JSON.stringify(newGroup));

        try {
            await createGroup(newGroup);

            // Pass the time as a string to the home screen
            nav.push('Groups', {}); // Push is needed in order to refresh the home screen state
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
            {/* TODO: Add a form to create the record */}
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
                        value={values.groupDescription}
                        onChangeText={handleChange('groupDescription')}
                    />
                    {touched.groupDescription && errors.groupDescription && (
                        <ErrorMessage errorMessage={errors.groupDescription} />
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
