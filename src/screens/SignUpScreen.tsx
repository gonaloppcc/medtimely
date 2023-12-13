import * as Yup from 'yup';
import * as React from 'react';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import {createUserWithEmailAndPassword} from '../services/auth';
import {View} from 'react-native';
import {formStyle} from './LoginScreen';

const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().equals([Yup.ref('password')], 'Passwords must match').required('Required'),
});

interface Values {
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUp = () => {
    const passwordTextInput = React.useRef(null);
    const confirmPasswordTextInput = React.useRef(null);
    const [submitError, setSubmitError] = React.useState(null);

    const theme = useTheme();

    const onSubmit = async (values: Values) => {
        try {
            await createUserWithEmailAndPassword(values.email, values.password);
        } catch (error) {
            const errorMessage = error.message;
            setSubmitError(errorMessage);
        }
    };

    return <Formik<Values>
        initialValues={{email: '', password: '', confirmPassword: ''}}
        onSubmit={onSubmit}
        validationSchema={signupValidationSchema}>
        {({handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, isSubmitting}) => (
            <View style={formStyle.formStyle}>
                <Text variant="titleLarge">Sign up</Text>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        passwordTextInput.current.focus();
                    }}
                    blurOnSubmit={false}
                />
                {touched.email && errors.email &&
                    <Text variant="bodySmall" style={{color: theme.colors.error}}>{errors.email}</Text>}

                <TextInput
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    returnKeyType="next"
                    ref={passwordTextInput}
                    onSubmitEditing={() => {
                        confirmPasswordTextInput.current.focus();
                    }}
                    blurOnSubmit={false}
                />
                {touched.password && errors.password &&
                    <Text variant="bodySmall" style={{color: theme.colors.error}}>{errors.password}</Text>}

                <TextInput
                    placeholder="Confirm password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    returnKeyType="default"
                    onSubmitEditing={() => handleSubmit()}
                    ref={confirmPasswordTextInput}
                />
                {touched.confirmPassword && errors.confirmPassword &&
                    <Text variant="bodySmall" style={{color: theme.colors.error}}>{errors.confirmPassword}</Text>}

                {submitError && <Text variant="bodySmall" style={{color: theme.colors.error}}>{submitError}</Text>}

                <Button mode="contained" onPress={() => handleSubmit()}
                    loading={isSubmitting}
                    disabled={!isValid}>
                    Sign up
                </Button>
            </View>
        )}
    </Formik>;
};

