import { Medication } from './medication';

export interface OwnedMedication extends Medication {
    id: string;
    medicationId: string;
    stock: number;
}

export interface PlannedMedication {
    id: string;
    ownedMedication: OwnedMedication;
    doseToBeTaken: number;
    schedule: PlannedMedicationSchedule;
}

export interface PlannedMedicationSchedule {
    timeEachDay: string; // FIXME: Is this the right type?
}
