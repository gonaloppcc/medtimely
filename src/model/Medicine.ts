import { MedicationRecordForm } from './MedicationRecord';

export interface Medicine {
    name: string;
    dosage: string;
    form: MedicationRecordForm;
    amount?: number;
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
            iconName = 'eyedroppper';
            break;

        case MedicationRecordForm.LIQUID:
            iconName = 'bottle-tonic-plus';
            break;
        default:
            break;
    }

    return iconName;
};
