export type Permissions = 'view' | 'manage' | 'none';

export interface Group {
    id?: string;
    name: string;
    description: string;
    users: string[];
    sharedMeds: string[];
    treatmentPermissions: Permissions;
    hasSharedStock: boolean;
}
