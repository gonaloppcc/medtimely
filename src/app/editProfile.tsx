// EditProfileScreen.tsx
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
import { Checkbox } from '../components/Checkbox';
import { OptionalInfo } from '../model/user';
import { createUserDoc } from '../services/users';
import {
    physicalActivityOptionsMap,
    pharmacyVisitsOptionsMap,
    medicationUseOptionsMap,
    planFollowedOptionsMap,
    createOptionsFromMap,
} from '../constants/surveyConstants';
import { useUser } from '../hooks/useUser';
import { getAuth } from 'firebase/auth';

const physicalActivityOptions: ItemPickerProp[] = createOptionsFromMap(physicalActivityOptionsMap);
const pharmacyVisitsOptions: ItemPickerProp[] = createOptionsFromMap(pharmacyVisitsOptionsMap);
const medicationUseOptions: ItemPickerProp[] = createOptionsFromMap(medicationUseOptionsMap);
const planFollowedOptions: ItemPickerProp[] = createOptionsFromMap(planFollowedOptionsMap);

const editProfileValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Required'),
    // Add other validation rules for fields you need
    // ...
});

interface Values {
    name: string;
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

interface EditProfileScreenProps {
    userId: string;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ userId }) => {
    const insets = useSafeAreaInsets();
    const firstNameTextInput = React.useRef(null);
    const lastNameTextInput = React.useRef(null);
    const jobTextInput = React.useRef(null);
    const heightTextInput = React.useRef(null);
    const weightTextInput = React.useRef(null);

    const theme = useTheme();
    const router = useRouter();

    const { userDoc, refetch } = useUser(userId);

    // TODO : complete
    const {
        values,
        isValid,
        isSubmitting,
        handleSubmit,
        handleChange,
        errors,
        touched,
    } = useFormik<Values>({
        initialValues: {
            name: '',
            firstname: '',  
            lastname: '',
            job: '',
            height: '',
            weight: '',
            pharmacyVisitsFrequency: '',
            medicationUseFrequency: '',
            planFollowedFrequency: '',
            physicalActivityFrequency: '',
        },
        validationSchema: editProfileValidationSchema,
        async onSubmit(values: Values) {
            try {
                const auth = getAuth(); 
                const user = auth.currentUser;

                if (user) {
                    const heightNum: number =
                        values.height.length > 0 ? parseInt(values.height, 10) : -1;
                    const weightNum: number =
                        values.weight.length > 0 ? parseInt(values.weight, 10) : -1;

                    const optionalValues: OptionalInfo = {
                        job: values.job,
                        height: heightNum,
                        weight: weightNum,
                        pharmacyVisitsFrequency: values.pharmacyVisitsFrequency,
                        medicationUseFrequency: values.medicationUseFrequency,
                        planFollowedFrequency: values.planFollowedFrequency,
                        physicalActivityFrequency: values.physicalActivityFrequency,
                    };

                    await createUserDoc(db, user.uid, values.firstname, values.lastname, true, optionalValues);
                    // Refresh the user data after updating
                    refetch();
                }
            } catch (error) {
                console.error('Error updating user profile:', error);
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
                        {/* Complete */}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default EditProfileScreen;
