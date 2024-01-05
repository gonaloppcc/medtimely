import { MedicationRecordForm } from './MedicationRecord';

// https://extranet.infarmed.pt/INFOMED-fo/pesquisa-avancada.xhtml
export interface Medication {
    name: string; // Nome do Medicamento
    activeSubstance?: string; // Substância Ativa/DCI
    form: MedicationRecordForm; // Forma Farmacêutica
    dosage: string; // Dosagem
    aimTitular?: string; // Titular de AIM
    comercialization?: boolean; // Comercialização
    isGeneric?: boolean; // Genérico
    administration?: string; // Via de Administração TODO: Create enum for this

    /*
    // https://www.nhs.uk/medicines/alogliptin/about-alogliptin/
    description?: string; // Descrição
    keyFacts?: string[]; // Factos Relevantes
    */

    presentations: MedicationPresentation[];
}

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
