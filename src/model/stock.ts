import { MedicationRecordForm } from './MedicationRecord';

export interface Stock {
    personalStock: PersonalStockItem[];
    groupsStock: GrupStock[];
}

export interface PersonalStockItem {
    medicationName: string;
    medicationId: string;
    form: MedicationRecordForm;
    amountLeft: number;
    daysToRunOf: number;
}

export interface GroupStockItem extends PersonalStockItem {
    numberOfPersons: number;
}

export interface GrupStock {
    groupName: string;
    groupId: string;
    stock: GroupStockItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPersonalStockItem(obj: any): obj is PersonalStockItem {
    return (
        typeof obj.medicationName === 'string' &&
        typeof obj.medicationId === 'string' &&
        typeof obj.form === 'string' &&
        typeof obj.amountLeft === 'number' &&
        typeof obj.daysToRunOf === 'number'
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isGroupStockItem(obj: any): obj is GroupStockItem {
    return (
        typeof obj.medicationName === 'string' &&
        typeof obj.medicationId === 'string' &&
        typeof obj.form === 'string' &&
        typeof obj.amountLeft === 'number' &&
        typeof obj.daysToRunOf === 'number' &&
        typeof obj.numberOfPersons === 'number'
    );
}
