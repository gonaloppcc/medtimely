import { MedicationRecordForm } from './MedicationRecord';

export interface Medication {
    name: string;
    amount: number;
    dosage: string;
    form: MedicationRecordForm;
    time?: string;
    //timeRelative?: string[];
}
