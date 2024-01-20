import { MedicationRecordForm } from './medicationRecord';

// https://extranet.infarmed.pt/INFOMED-fo/pesquisa-avancada.xhtml
export interface Medication {
    id: string; // Código do Medicamento
    name: string; // Nome do Medicamento
    form: MedicationRecordForm; // Forma Farmacêutica
    dosage: string; // Dosagem
    activeSubstance?: string; // Substância Ativa/DCI
    aimTitular?: string; // Titular de AIM
    commercialisation?: boolean; // Comercialização
    isGeneric?: boolean; // Genérico
    administration?: string; // Via de Administração TODO: Create enum for this

    /*
    // https://www.nhs.uk/medicines/alogliptin/about-alogliptin/
    description?: string; // Descrição
    keyFacts?: string[]; // Factos Relevantes
    */

    presentations: MedicationPresentation[];

    // TODO: Add scanning codes here
}

export type MedicationData = Omit<Medication, 'id'>;

export interface MedicationPresentation {
    storageConditions: MedicationStorageConditions;
    pricing: MedicationPricing;
    safetyFeatures?: boolean;
}

export interface MedicationPricing {
    units: number;
    pvp?: number;
    maxPrice?: number;
    isNotMarketed?: boolean; // When the medication is not marketed, pricing is not available
}

export interface MedicationStorageConditions {
    presentationType: MedicationPresentationType;
    shelfLife: number; // Validade (meses) // TODO: Make sure that months is a duable unit
    temperature: number | null; // Temperatura (ºC)
    conditions: string | null; // Condições
}

export type MedicationPresentationType = 'Unopened' | 'Opened';

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
