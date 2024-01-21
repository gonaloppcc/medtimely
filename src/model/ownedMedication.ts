import { Medication } from './medication';

export interface OwnedMedication extends Medication {
    id: string; // full path to subcollection
    stock: number;
    medicationId?: string;
}

export type OwnedMedicationData = Omit<OwnedMedication, 'id'>;

export interface PlannedMedication {
    ownedMedication: OwnedMedication;
    doseToBeTaken: number;
    schedule: PlannedMedicationSchedule;
}

export interface PlannedMedicationSchedule {
    startDate: string;
    endDate?: string;
    timeBetweenDosesInHours: number;
}
