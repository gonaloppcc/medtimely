import { Medication } from './medication';

export interface OwnedMedication extends Medication {
    id: string; // full path to subcollection
    stock: number;
    medicationId?: string;
}

export type OwnedMedicationData = Omit<OwnedMedication, 'id'>;

export type OwnedMedicationWithoutMedicationFields = Required<
    Pick<OwnedMedication, 'stock' | 'medicationId'>
>;

export interface PlannedMedication {
    ownedMedication: OwnedMedication;
    doseToBeTaken: number;
    schedule: PlannedMedicationSchedule;
}

export interface PlannedMedicationSchedule {
    startDate: Date; // datetime of first time medication is scheduled
    endDate?: Date;
    timeBetweenDosesInHours: number;
}
