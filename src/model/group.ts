import { User } from './user';

export type Permissions = 'view' | 'manage' | 'none';

export interface Group {
    id: string;
    name: string;
    description: string;
    users: User[];
    treatmentPermissions: Permissions;
    hasSharedStock: boolean;
}

export type GroupData = Omit<Omit<Group, 'id'>, 'users'>;
