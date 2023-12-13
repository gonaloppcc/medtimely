import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import {createUserWithEmailAndPassword, loginWithEmailAndPassword} from '../services/auth';


const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().equals([Yup.ref('password')], 'Passwords must match').required('Required'),
});

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
});

const SignUp = () => {
    const passwordTextInput = React.useRef(null);
    const confirmPasswordTextInput = React.useRef(null);
    const [error, setError] = React.useState(null);

    const theme = useTheme();

    return <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        onSubmit={async (values) => {
            try {
                await createUserWithEmailAndPassword(values.email, values.password);
            } catch (error) {
                const errorMessage = error.message;
                setError(errorMessage);
            }
        }}
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

                {error && <Text variant="bodySmall" style={{color: theme.colors.error}}>{error}</Text>}

                <Button mode="contained" onPress={() => handleSubmit()}
                    loading={isSubmitting}
                    disabled={!isValid}>
                    Sign up
                </Button>
            </View>
        )}
    </Formik>;
};


const Login = () => {
    const passwordTextInput = React.useRef(null);
    const theme = useTheme();

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values) => {
                loginWithEmailAndPassword(values.email, values.password)
                    .then(() => {
                        // const user = result.user;
                    })
                    .catch(() => {
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        // TODO: Handle error
                    });
            }}
            validationSchema={loginValidationSchema}
        >
            {({handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, isSubmitting}) => (
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
                            passwordTextInput.current.focus();
                        }}
                        blurOnSubmit={false}
                        returnKeyType="next"
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
                        ref={passwordTextInput}
                        returnKeyType="default"
                        onSubmitEditing={() => handleSubmit()}
                    />
                    {touched.password && errors.password &&
                        <Text variant="bodySmall" style={{color: theme.colors.error}}>{errors.password}</Text>}

                    <Button mode="contained" onPress={() => handleSubmit()} loading={isSubmitting} disabled={!isValid}>
                        Log in
                    </Button>
                </View>
            )}
        </Formik>
    );

};

const formStyle = StyleSheet.create({
    formStyle: {
        display: 'flex',
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        rowGap: 16,
    }
});

export {SignUp, Login};
