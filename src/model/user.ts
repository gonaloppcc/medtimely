import { MedicationRecord } from './medicationRecord';
import { Medication } from './medication';

export interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    records: MedicationRecord[];
    medications: Medication[];
    groups: string[];
}
