import * as React from 'react';

import * as Yup from 'yup';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import { createUserWithEmailAndPassword } from '../../services/auth';
import { ScrollView, View } from 'react-native';
import { formStyle } from '../../constants/formStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase';
import { ItemPickerProp, Picker } from '../../components/Picker';
import { Checkbox } from '../../components/Checkbox';
import { OptionalInfo } from '../../model/user';
import { createUserDoc } from '../../services/users';
import {
    physicalActivityOptionsMap,
    pharmacyVisitsOptionsMap,
    medicationUseOptionsMap,
    planFollowedOptionsMap,
    createOptionsFromMap,
} from '../../constants/surveyConstants';

const physicalActivityOptions: ItemPickerProp[] = createOptionsFromMap(
    physicalActivityOptionsMap
);
const pharmacyVisitsOptions: ItemPickerProp[] = createOptionsFromMap(
    pharmacyVisitsOptionsMap
);
const medicationUseOptions: ItemPickerProp[] = createOptionsFromMap(
    medicationUseOptionsMap
);
const planFollowedOptions: ItemPickerProp[] = createOptionsFromMap(
    planFollowedOptionsMap
);

const signupValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    confirmPassword: Yup.string()
        .equals([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});

interface Values {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    job: string;
    height: string;
    weight: string;
    pharmacyVisitsFrequency: string;
    medicationUseFrequency: string;
    planFollowedFrequency: string;
    physicalActivityFrequency: string;
}

const initialValues: Values = {
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    job: '',
    height: '',
    weight: '',
    pharmacyVisitsFrequency: '',
    medicationUseFrequency: '',
    planFollowedFrequency: '',
    physicalActivityFrequency: '',
};

export default function SignUpScreen() {
    const insets = useSafeAreaInsets();
    const firstNameTextInput = React.useRef(null);
    const lastNameTextInput = React.useRef(null);
    const emailTextInput = React.useRef(null);
    const passwordTextInput = React.useRef(null);
    const confirmPasswordTextInput = React.useRef(null);
    const jobTextInput = React.useRef(null);
    const heightTextInput = React.useRef(null);
    const weightTextInput = React.useRef(null);
    const [submitErrorMessage, setSubmitErrorMessage] =
        React.useState<string>('');

    const theme = useTheme();
    const router = useRouter();

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
                const User = await createUserWithEmailAndPassword(
                    values.email,
                    values.password
                );

                const auth = getAuth();

                auth.currentUser &&
                    (await updateProfile(auth.currentUser, {
                        displayName: values.name,
                    }));
                if (showQuestionnaire) {
                    const heightNum: number =
                        values.height.length > 0
                            ? parseInt(values.height, 10)
                            : -1;
                    const weightNum: number =
                        values.weight.length > 0
                            ? parseInt(values.weight, 10)
                            : -1;
                    const optionalValues: OptionalInfo = {
                        job: values.job,
                        height: heightNum,
                        weight: weightNum,
                        pharmacyVisitsFrequency: values.pharmacyVisitsFrequency,
                        medicationUseFrequency: values.medicationUseFrequency,
                        planFollowedFrequency: values.planFollowedFrequency,
                        physicalActivityFrequency:
                            values.physicalActivityFrequency,
                    };
                    await createUserDoc(
                        db,
                        User.uid,
                        values.firstname,
                        values.lastname,
                        true,
                        optionalValues
                    );
                } else {
                    await createUserDoc(
                        db,
                        User.uid,
                        values.firstname,
                        values.lastname,
                        false
                    );
                }
            } catch (error) {
                const errorMessage =
                    (error.message as string) || 'Something went wrong';
                setSubmitErrorMessage(errorMessage);
            }
        },
    });

    const [showQuestionnaire, setShowQuestionnaire] = React.useState(false);

    return (
        <ScrollView>
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
                            id="name"
                            placeholder="Display Name"
                            autoCapitalize="none"
                            textContentType="name"
                            keyboardType="default"
                            returnKeyType="next"
                            onChangeText={handleChange('name')}
                            value={values.name}
                            onSubmitEditing={() => {
                                // @ts-expect-error Needed to focus on next input
                                // noinspection JSUnresolvedReference
                                firstNameTextInput.current.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        {touched.name && errors.name && (
                            <Text
                                variant="bodySmall"
                                style={{ color: theme.colors.error }}
                            >
                                {errors.name}
                            </Text>
                        )}
                        <TextInput
                            id="firstname"
                            ref={firstNameTextInput}
                            placeholder="First Name"
                            autoCapitalize="none"
                            textContentType="name"
                            keyboardType="default"
                            returnKeyType="next"
                            onChangeText={handleChange('firstname')}
                            value={values.firstname}
                            onSubmitEditing={() => {
                                // @ts-expect-error Needed to focus on next input
                                // noinspection JSUnresolvedReference
                                lastNameTextInput.current.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            id="lastname"
                            ref={lastNameTextInput}
                            placeholder="Last Name"
                            autoCapitalize="none"
                            textContentType="name"
                            keyboardType="default"
                            returnKeyType="next"
                            onChangeText={handleChange('lastname')}
                            value={values.lastname}
                            onSubmitEditing={() => {
                                // @ts-expect-error Needed to focus on next input
                                // noinspection JSUnresolvedReference
                                emailTextInput.current.focus();
                            }}
                            blurOnSubmit={false}
                        />

                        <TextInput
                            id="email"
                            ref={emailTextInput}
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

                        <Checkbox
                            label="Answer Some Optional Questions"
                            value={showQuestionnaire}
                            onValueChange={setShowQuestionnaire}
                        />

                        {showQuestionnaire && (
                            <View style={formStyle.formStyle}>
                                <TextInput
                                    id="job"
                                    ref={jobTextInput}
                                    placeholder="Your Job"
                                    autoCapitalize="none"
                                    textContentType="jobTitle"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={handleChange('job')}
                                    value={values.job}
                                    onSubmitEditing={() => {
                                        // @ts-expect-error Needed to focus on next input
                                        // noinspection JSUnresolvedReference
                                        heightTextInput.current.focus();
                                    }}
                                />
                                <TextInput
                                    id="height"
                                    ref={heightTextInput}
                                    placeholder="Height in cm"
                                    autoCapitalize="none"
                                    textContentType="none"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onChangeText={handleChange('height')}
                                    value={values.height}
                                    onSubmitEditing={() => {
                                        // @ts-expect-error Needed to focus on next input
                                        // noinspection JSUnresolvedReference
                                        weightTextInput.current.focus();
                                    }}
                                />
                                <TextInput
                                    id="weight"
                                    ref={weightTextInput}
                                    placeholder="Weight in Kg"
                                    autoCapitalize="none"
                                    textContentType="none"
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    onChangeText={handleChange('weight')}
                                    value={values.weight}
                                />
                                <Picker
                                    label="Physical Activity Frequency"
                                    selectedValue={
                                        values.physicalActivityFrequency
                                    }
                                    onValueChange={(value) =>
                                        handleChange(
                                            'physicalActivityFrequency'
                                        )(value)
                                    }
                                    items={physicalActivityOptions}
                                />
                                <Picker
                                    label="Pharmacy Visits Frequency"
                                    selectedValue={
                                        values.pharmacyVisitsFrequency
                                    }
                                    onValueChange={(value) =>
                                        handleChange('pharmacyVisitsFrequency')(
                                            value
                                        )
                                    }
                                    items={pharmacyVisitsOptions}
                                />
                                <Picker
                                    label="Medication Use Frequency"
                                    selectedValue={
                                        values.medicationUseFrequency
                                    }
                                    onValueChange={(value) =>
                                        handleChange('medicationUseFrequency')(
                                            value
                                        )
                                    }
                                    items={medicationUseOptions}
                                />
                                <Picker
                                    label="Plan Followed Frequency"
                                    selectedValue={values.planFollowedFrequency}
                                    onValueChange={(value) =>
                                        handleChange('planFollowedFrequency')(
                                            value
                                        )
                                    }
                                    items={planFollowedOptions}
                                />
                            </View>
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
                        router.push('/auth/signin');
                    }}
                >
                    Already have an account?
                </Button>
            </View>
        </ScrollView>
    );
}
