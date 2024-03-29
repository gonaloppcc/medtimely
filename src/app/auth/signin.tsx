import * as React from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import { loginWithEmailAndPassword } from '../../services/auth';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Yup from 'yup';
import { formStyle } from '../../constants/formStyle';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
});

interface Values {
    email: string;
    password: string;
}

const initialValues: Values = {
    email: '',
    password: '',
};

export default function LoginScreen() {
    const passwordTextInput = React.useRef(null);
    const router = useRouter();
    const theme = useTheme();

    const [submitError, setSubmitError] = React.useState(null);

    const onSubmit = async (values: Values) => {
        try {
            await loginWithEmailAndPassword(values.email, values.password);
            router.replace('/');
        } catch (error) {
            const errorMessage = error.message;
            setSubmitError(errorMessage);
            console.log('ERROR: ', errorMessage);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                rowGap: 16,
                marginHorizontal: 16,
            }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={loginValidationSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    isValid,
                    isSubmitting,
                }) => (
                    <View style={formStyle.formStyle}>
                        <Text variant="titleLarge">Log in</Text>
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            onSubmitEditing={() => {
                                // @ts-expect-error Needed to focus on next input
                                // noinspection JSUnresolvedReference
                                passwordTextInput.current.focus();
                            }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                        />
                        {touched.email && errors.email && (
                            <Text
                                variant="bodySmall"
                                style={{ color: theme.colors.error }}
                            >
                                {errors.email}
                            </Text>
                        )}
                        <TextInput
                            placeholder="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType="password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            ref={passwordTextInput}
                            returnKeyType="default"
                            onSubmitEditing={() => handleSubmit()}
                        />
                        {touched.password && errors.password && (
                            <Text
                                variant="bodySmall"
                                style={{ color: theme.colors.error }}
                            >
                                {errors.password}
                            </Text>
                        )}
                        <Button
                            mode="contained"
                            onPress={() => handleSubmit()}
                            loading={isSubmitting}
                            disabled={!isValid}
                        >
                            Log in
                        </Button>
                        {submitError && (
                            <Text
                                variant="bodySmall"
                                style={{ color: theme.colors.error }}
                            >
                                {submitError}
                            </Text>
                        )}
                    </View>
                )}
            </Formik>
        </View>
    );
}
