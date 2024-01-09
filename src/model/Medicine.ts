import { MedicationRecordForm } from './MedicationRecord';

export interface PersonalMedication {
    id: string;
    name: string;
    dosage: string;
    form: MedicationRecordForm;
    amount?: number;
    time?: string;
}

//FIXME: Check the MedicationRecordForm and decide which onew we will use
// see list https://callstack.github.io/react-native-paper/docs/guides/icons/
export const medicationFormToIconName = (form: MedicationRecordForm) => {
    let iconName = 'pill';
    switch (form) {
        case MedicationRecordForm.CAPSULE:
            break;
        case MedicationRecordForm.INJECTION:
            iconName = 'needle';
            break;
        case MedicationRecordForm.DROPS:
            iconName = 'eyedropper';
            break;

        case MedicationRecordForm.LIQUID:
            iconName = 'bottle-tonic-plus';
            break;
        default:
            break;
    }

    return iconName;
};
