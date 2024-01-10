import { MedicationRecordForm } from '../../model/MedicationRecord';
import { Stock } from '../../model/stock';

export const STOCK: Stock = {
    personalStock: [
        {
            medicationName: 'Paracetamol',
            medicationId: '1',
            amountLeft: 20,
            daysToRunOf: 10,
            form: MedicationRecordForm.TABLET,
        },
        {
            medicationName: 'Ibuprofen',
            medicationId: '2',
            amountLeft: 15,
            daysToRunOf: 5,
            form: MedicationRecordForm.CAPSULE,
        },
    ],
    groupsStock: [
        {
            groupName: 'Family Group',
            groupId: '101',
            stock: [
                {
                    medicationName: 'Aspirin',
                    medicationId: '12',
                    amountLeft: 50,
                    daysToRunOf: 15,
                    form: MedicationRecordForm.TABLET,
                    numberOfPersons: 5,
                },
                {
                    medicationName: 'Vitamin C',
                    medicationId: '14',
                    amountLeft: 100,
                    daysToRunOf: 30,
                    form: MedicationRecordForm.LIQUID,
                    numberOfPersons: 5,
                },
            ],
        },
        {
            groupName: 'University',
            groupId: '102',
            stock: [
                {
                    medicationName: 'Aspirin 2',
                    medicationId: '3',
                    amountLeft: 50,
                    daysToRunOf: 15,
                    form: MedicationRecordForm.TABLET,
                    numberOfPersons: 5,
                },
                {
                    medicationName: 'Vitamin C',
                    medicationId: '4',
                    amountLeft: 100,
                    daysToRunOf: 30,
                    form: MedicationRecordForm.CAPSULE,
                    numberOfPersons: 5,
                },
            ],
        },
    ],
};

export const getStock = async (token: string): Promise<Stock> => {
    console.log(`Fetching stock for user with id=${token}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STOCK);
        }, 1000);
    });
};
