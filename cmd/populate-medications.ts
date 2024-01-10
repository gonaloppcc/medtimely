import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { getFirestore, writeBatch } from 'firebase/firestore';
import { MedicationRecordForm } from '../src/model/medicationRecord';
import { Medication } from '../src/model/medication';
import { createMedication } from '../src/services/medications';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.argv.length !== 2) {
    // 2 arguments: node, path where script is running. No additional arguments
    console.log('Usage: yarn cmd:populate-medications');
    process.exit(1);
}

const medications: Medication[] = [
    {
        name: 'Vipidia',
        activeSubstance: 'alogliptin',
        form: MedicationRecordForm.TABLET,
        dosage: '12.5 mg',
        aimTitular: 'Takeda Pharma A/S',
        comercialization: true,
        isGeneric: false,
        administration: 'Oral use',
        presentations: [
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 14,
                    pvp: 9.97,
                    maxPrice: 10.44,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 28,
                    pvp: 19.84,
                    maxPrice: 19.84,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: 4 * 12, // 4 years
                    temperature: null,
                    conditions: null,
                },
                pricing: {
                    units: 56,
                    isNotMarketed: true,
                },
                safetyFeatures: true,
            },
        ],
    },
];

(async () => {
    const batch = writeBatch(db);

    await Promise.all(
        medications.map(async (medication) => {
            return await createMedication(db, medication);
        })
    );

    await batch.commit();
})()
    .then(() => {
        console.log(`All done!`);
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
