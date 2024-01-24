export interface OptionalInfo {
    job?: string;
    height?: number;
    weight?: number;
    pharmacyVisitsFrequency?: string;
    medicationUseFrequency?: string;
    planFollowedFrequency?: string;
    physicalActivityFrequency?: string;
    diseases?: string[];
}

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    groups: string[];
    optionalInfo?: OptionalInfo;

    // last time checked notifs

    // add service for user : update, update time last notif, etc

    // see authentication with Google

    // add name to start screen " Welcome back FST_NAME LST_NAME"
}

export type UserData = Omit<User, 'id'>;
