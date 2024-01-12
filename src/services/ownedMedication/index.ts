import { MedicationRecordForm } from '../../model/medicationRecord';
import { OwnedMedication } from '../../model/ownedMedication';

export const OWNED_MEDICATION: OwnedMedication = {
    activeSubstance: '',
    administration: '',
    aimTitular: '',
    commercialisation: false,
    dosage: '',
    form: MedicationRecordForm.AEROSOL,
    id: '',
    isGeneric: false,
    medicationId: '',
    name: '',
    presentations: [],
    stock: 0,
};

export const getOwnedMedication = async (
    uid: string,
    ownedMedicationId: string
): Promise<OwnedMedication> => {
    console.log(
        `Fetching stock for user with id=${uid} and ownedMedicationId=${ownedMedicationId}`
    );

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(OWNED_MEDICATION);
        }, 1000);
    });
};

// Only the user's owned medications are returned
// Meaning the group ones are not returned
export const getUserOwnedMedications = async (
    uid: string
): Promise<OwnedMedication[]> => {
    console.log(`Fetching stock for user with id=${uid}`);

    // TODO: Implement this

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([OWNED_MEDICATION]);
        }, 1000);
    });
};

export const getUserGroupOwnedMedications = async (
    uid: string,
    groupId: string
): Promise<OwnedMedication[]> => {
    console.log(
        `Fetching stock for user with id=${uid} and groupId=${groupId}`
    );

    // TODO: Implement this

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([OWNED_MEDICATION]);
        }, 1000);
    });
};
