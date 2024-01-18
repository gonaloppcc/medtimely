export interface Member {
    id: string;
    name: string;
    sharedMeds: string[];
    hasSharedStock: boolean;
}

export type GroupMemberData = Omit<Member, 'id'>;
