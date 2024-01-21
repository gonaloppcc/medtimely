import * as React from 'react';
import * as Yup from 'yup';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import { ScrollView, View } from 'react-native';
import { formStyle } from '../constants/formStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { db } from '../firebase';
import { ItemPickerProp, Picker } from '../components/Picker';
import { getUserDoc, partialUpdateUserDoc } from '../services/users';
import {
    physicalActivityOptionsMap,
    pharmacyVisitsOptionsMap,
    medicationUseOptionsMap,
    planFollowedOptionsMap,
    createOptionsFromMap,
} from '../constants/surveyConstants';
import { useAuthentication } from '../hooks/useAuthentication';
import { ROUTE } from '../model/routes';

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

const editProfileValidationSchema = Yup.object().shape({
    firstname: Yup.string().min(3, 'First name must be at least 3 characters').required('Required'),
    lastname: Yup.string().min(3, 'Last name must be at least 3 characters').required('Required'),
    job: Yup.string(),
    height: Yup.number().positive('Height must be a positive number'),
    weight: Yup.number().positive('Weight must be a positive number'),
    pharmacyVisitsFrequency: Yup.string(),
    medicationUseFrequency: Yup.string(),
    planFollowedFrequency: Yup.string(),
    physicalActivityFrequency: Yup.string(),
});

interface EditProfileValues {
    firstname: string;
    lastname: string;
    job: string;
    height: string;
    weight: string;
    pharmacyVisitsFrequency: string;
    medicationUseFrequency: string;
    planFollowedFrequency: string;
    physicalActivityFrequency: string;
}

const initialEditProfileValues: EditProfileValues = {
    firstname: '',
    lastname: '',
    job: '',
    height: '',
    weight: '',
    pharmacyVisitsFrequency: '',
    medicationUseFrequency: '',
    planFollowedFrequency: '',
    physicalActivityFrequency: '',
};

export default function EditProfileScreen() {
    const { user } = useAuthentication();
    const insets = useSafeAreaInsets();
    const firstNameTextInput = React.useRef(null);
    const lastNameTextInput = React.useRef(null);
    const jobTextInput = React.useRef(null);
    const heightTextInput = React.useRef(null);
    const weightTextInput = React.useRef(null);

    const theme = useTheme();
    const router = useRouter();

    const userDoc = getUserDoc(db, user?.uid!);

    const initialValues: EditProfileValues = {
        ...initialEditProfileValues,
        ...userDoc,
    };

    const {
        values,
        isValid,
        isSubmitting,
        handleSubmit,
        handleChange,
        errors,
        touched,
    } = useFormik<EditProfileValues>({
        initialValues,
        validationSchema: editProfileValidationSchema,
        async onSubmit(changedValues: EditProfileValues) {
            try {
                const updatedValues: EditProfileValues = Object.keys(changedValues).reduce(
                    (acc, key) => {
                        if (changedValues[key] !== userDoc[key]) {
                            acc[key] = changedValues[key];
                        }
                        return acc;
                    },
                    {} as EditProfileValues
                );

                await partialUpdateUserDoc(db, user?.uid!, updatedValues);

                router.push(ROUTE.SETTINGS.BASE_NAME);
            } catch (error) {
                console.error('Error editing user:', error);
            }
        },
    });

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
                <Text variant="headlineMedium">Edit Profile</Text>
                <View style={formStyle.formStyle}>
                    <View style={formStyle.formStyle}>
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
                        {touched.firstname && errors.firstname && (
                            <Text
                                variant="bodySmall"
                                style={{ color: theme.colors.error }}
                            >
                                {errors.firstname}
                            </Text>
                        )}

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
                                jobTextInput.current.focus();
                            }}
                            blurOnSubmit={false}
                        />

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
                            returnKeyType="default"
                            onChangeText={handleChange('weight')}
                            value={values.weight}
                        />

                        <Picker
                            label="Physical Activity Frequency"
                            selectedValue={values.physicalActivityFrequency}
                            onValueChange={(value) =>
                                handleChange('physicalActivityFrequency')(value)
                            }
                            items={physicalActivityOptions}
                        />

                        <Picker
                            label="Pharmacy Visits Frequency"
                            selectedValue={values.pharmacyVisitsFrequency}
                            onValueChange={(value) =>
                                handleChange('pharmacyVisitsFrequency')(value)
                            }
                            items={pharmacyVisitsOptions}
                        />

                        <Picker
                            label="Medication Use Frequency"
                            selectedValue={values.medicationUseFrequency}
                            onValueChange={(value) =>
                                handleChange('medicationUseFrequency')(value)
                            }
                            items={medicationUseOptions}
                        />

                        <Picker
                            label="Plan Followed Frequency"
                            selectedValue={values.planFollowedFrequency}
                            onValueChange={(value) =>
                                handleChange('planFollowedFrequency')(value)
                            }
                            items={planFollowedOptions}
                        />

                        <Button
                            mode="contained"
                            onPress={() => handleSubmit()}
                            loading={isSubmitting}
                            disabled={!isValid}
                        >
                            Save Changes
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
