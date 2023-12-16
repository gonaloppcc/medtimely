
export interface MedicationRecord {
    name: string;
    dosage: string;
    form: string;
    amount?: number;
    missed?: boolean;
}
