import { MedicationRecord } from './medicationRecord';
import { Medication } from './medication';

export interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    records: MedicationRecord[];
    medications: Medication[];
    groups: string[];

    // last time checked notifs

    // add service for user : update, update time last notif, etc

    // see authentication with Google

    // add name to start screen " Welcome back FST_NAME LST_NAME"
}

export type UserData = Omit<User, 'id'>;
