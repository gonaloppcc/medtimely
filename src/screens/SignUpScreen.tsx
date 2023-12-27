import * as React from 'react';

import * as Yup from 'yup';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import { createUserWithEmailAndPassword } from '../services/auth';
import { View } from 'react-native';
import { formStyle } from './LoginScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../navigation/routes';

const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    confirmPassword: Yup.string()
        .equals([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});

interface Values {
    email: string;
    password: string;
    confirmPassword: string;
}

const initialValues: Values = {
    email: '',
    password: '',
    confirmPassword: '',
};

export const SignUpScreen = ({
    navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) => {
    const insets = useSafeAreaInsets();
    const passwordTextInput = React.useRef(null);
    const confirmPasswordTextInput = React.useRef(null);
    const [submitErrorMessage, setSubmitErrorMessage] =
        React.useState<string>('');

    const theme = useTheme();

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
        validationSchema: signupValidationSchema,
        async onSubmit(values: Values) {
            try {
                await createUserWithEmailAndPassword(
                    values.email,
                    values.password
                );
            } catch (error) {
                const errorMessage =
                    (error.message as string) || 'Something went wrong';
                setSubmitErrorMessage(errorMessage);
            }
        },
    });

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                rowGap: 16,
                marginHorizontal: 16,
            }}
        >
            <Text variant="headlineMedium">Welcome to MedTimely</Text>
            <View style={formStyle.formStyle}>
                <View style={formStyle.formStyle}>
                    <Text variant="titleLarge">Sign up</Text>
                    <TextInput
                        id="email"
                        placeholder="Email"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onChangeText={handleChange('email')}
                        value={values.email}
                        onSubmitEditing={() => {
                            // @ts-expect-error Needed to focus on next input
                            // noinspection JSUnresolvedReference
                            passwordTextInput.current.focus();
                        }}
                        blurOnSubmit={false}
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
                        id="password"
                        ref={passwordTextInput}
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        returnKeyType="next"
                        onChangeText={handleChange('password')}
                        value={values.password}
                        onSubmitEditing={() => {
                            // @ts-expect-error Needed to focus on next input
                            // noinspection JSUnresolvedReference
                            confirmPasswordTextInput.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                    {touched.password && errors.password && (
                        <Text
                            variant="bodySmall"
                            style={{ color: theme.colors.error }}
                        >
                            {errors.password}
                        </Text>
                    )}

                    <TextInput
                        id="confirmPassword"
                        ref={confirmPasswordTextInput}
                        placeholder="Confirm password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        returnKeyType="default"
                        onChangeText={handleChange('confirmPassword')}
                        value={values.confirmPassword}
                        onSubmitEditing={() => handleSubmit()}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text
                            variant="bodySmall"
                            style={{ color: theme.colors.error }}
                        >
                            {errors.confirmPassword}
                        </Text>
                    )}

                    {submitErrorMessage && (
                        <Text
                            variant="bodySmall"
                            style={{ color: theme.colors.error }}
                        >
                            {submitErrorMessage}
                        </Text>
                    )}

                    <Button
                        mode="contained"
                        onPress={() => handleSubmit()}
                        loading={isSubmitting}
                        disabled={!isValid}
                    >
                        Sign up
                    </Button>
                </View>
            </View>
            {/* don't have an account? */}
            <Button
                mode="text"
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                Already have an account?
            </Button>
        </View>
    );
};
