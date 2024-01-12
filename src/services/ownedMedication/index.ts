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
    token: string
): Promise<OwnedMedication> => {
    console.log(`Fetching stock for user with id=${token}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(OWNED_MEDICATION);
        }, 1000);
    });
};
