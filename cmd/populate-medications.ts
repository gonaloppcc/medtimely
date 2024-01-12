import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { getFirestore, terminate, writeBatch } from 'firebase/firestore';
import { MedicationRecordForm } from '../src/model/medicationRecord';
import { Medication } from '../src/model/medication';
import { createMedication } from '../src/services/medications';
import { createReadStream } from 'fs';
import parse from 'csv-parser';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MEDICATIONS_FILE_PATH = './data/lista_infomed.csv';

// noinspection SpellCheckingInspection,JSNonASCIINames,NonAsciiCharacters
interface InfarmedMedication {
    ' Substância Ativa/DCI': string;
    'Nome do Medicamento': string;
    'Forma Farmacêutica': string;
    Dosagem: string;
    'Titular de AIM': string;
    Genérico: string;
    'Estado da AIM': string;
    Comercialização: string;
}

// noinspection SpellCheckingInspection,JSNonASCIINames,NonAsciiCharacters
const parseInfarmedMedicationToMedication = (
    infarmedMedication: InfarmedMedication
): Medication => {
    // noinspection SpellCheckingInspection,JSNonASCIINames,NonAsciiCharacters
    return {
        id: '',
        name: infarmedMedication['Nome do Medicamento'],
        activeSubstance: infarmedMedication['﻿Substância Ativa/DCI'],
        form: MedicationRecordForm.TABLET,
        dosage: infarmedMedication.Dosagem,
        aimTitular: infarmedMedication['Titular de AIM'],
        commercialisation: infarmedMedication.Comercialização === 'Sim',
        isGeneric: infarmedMedication.Genérico === 'Sim',
        administration: 'Oral use',
        presentations: [],
    };
};

const readMedications = (): Promise<Medication[]> =>
    new Promise((resolve) => {
        console.log('Reading medications from file');

        const medications: Medication[] = [];

        createReadStream(MEDICATIONS_FILE_PATH, { end: 100000 })
            .pipe(parse())
            .on('data', (infarmedMedication) => {
                console.log('Read medication: ', infarmedMedication);

                const medication =
                    parseInfarmedMedicationToMedication(infarmedMedication);

                console.log('Parsed medication: ', medication);

                medications.push(medication);
            })
            .on('finish', () => {
                resolve(medications);
            });
    });

(async () => {
    const batch = writeBatch(db);

    const medications = await readMedications();
    console.log(`Read ${medications.length} medications from file`);
    console.log('Medication 1: ', medications[0]);

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
    })
    .finally(async () => {
        console.log('Terminating connection to Firestore');
        await terminate(db);
    });

/*
if (process.argv.length !== 2) {
    // 2 arguments: node, path where script is running. No additional arguments
    console.log('Usage: yarn cmd:populate-medications');
    process.exit(1);
}

const medications: Medication[] = [
    {
        id: '1',
        name: 'Vipidia',
        activeSubstance: 'alogliptin',
        form: MedicationRecordForm.TABLET,
        dosage: '12.5 mg',
        aimTitular: 'Takeda Pharma A/S',
        commercialisation: true,
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

 */
