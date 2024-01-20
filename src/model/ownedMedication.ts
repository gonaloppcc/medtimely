import { Medication } from './medication';

export interface OwnedMedication extends Medication {
    id: string;
    stock: number;
    medicationId?: string;
}

export type OwnedMedicationData = Omit<OwnedMedication, 'id'>;

export interface PlannedMedication {
    id: string;
    ownedMedication: OwnedMedication;
    doseToBeTaken: number;
    schedule: PlannedMedicationSchedule;
    records: boolean[];
}

export interface PlannedMedicationSchedule {
    startDate: string;
    timeBetweenDosesInHours: number;
}
