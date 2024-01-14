// noinspection SpellCheckingInspection,JSNonASCIINames,NonAsciiCharacters

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

const randomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const randomChoice = <T>(choices: T[]): T =>
    choices[randomNumber(0, choices.length - 1)];

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

const randomShelfLife = (): number => randomChoice([0.5, 1, 2, 3, 4]) * 12; // 12 months in a year

const randomTemperature = (): number | null =>
    randomChoice([2, 8, 15, 25, 30, 40, null]);

const randomPrice1 = (): number =>
    randomNumber(1, 10) + randomNumber(0, 99) / 100;

const randomPrice2 = (): number =>
    randomNumber(10, 50) + randomNumber(0, 99) / 100;

const randomMaxPrice = (pvp: number): number => pvp + randomNumber(0, 99) / 100;

const randomUnits1 = (): number => randomChoice([10, 14, 18]);

const randomUnits2 = (): number => randomChoice([28, 30, 56, 60]);

const randomUnits3 = (): number => randomChoice([56, 60, 90, 100, 120]);

const parseInfarmedMedicationToMedication = (
    infarmedMedication: InfarmedMedication
): Medication => {
    const pvp1 = randomPrice1();
    const maxPrice1 = randomMaxPrice(pvp1);
    const pvp2 = randomPrice2();
    const maxPrice2 = randomMaxPrice(pvp2);

    return {
        id: '',
        name: infarmedMedication['Nome do Medicamento'],
        activeSubstance: infarmedMedication['﻿Substância Ativa/DCI'],
        form: MedicationRecordForm.TABLET, // TODO: Add mo
        dosage: infarmedMedication.Dosagem,
        aimTitular: infarmedMedication['Titular de AIM'],
        commercialisation: infarmedMedication.Comercialização === 'Sim',
        isGeneric: infarmedMedication.Genérico === 'Sim',
        administration: 'Oral use',
        presentations: [
            // Presentations are not in the CSV file, therefore will be randomly generated
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: randomShelfLife(),
                    temperature: randomTemperature(),
                    conditions: null,
                },
                pricing: {
                    units: randomUnits1(),
                    pvp: pvp1,
                    maxPrice: maxPrice1,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: randomShelfLife(),
                    temperature: randomTemperature(),
                    conditions: null,
                },
                pricing: {
                    units: randomUnits2(),
                    pvp: pvp2,
                    maxPrice: maxPrice2,
                },
                safetyFeatures: true,
            },
            {
                storageConditions: {
                    presentationType: 'Unopened',
                    shelfLife: randomShelfLife(),
                    temperature: randomTemperature(),
                    conditions: null,
                },
                pricing: {
                    units: randomUnits3(),
                    isNotMarketed: true,
                },
                safetyFeatures: true,
            },
        ],
    };
};

const readMedications = (): Promise<Medication[]> =>
    new Promise((resolve) => {
        console.log('Reading medications from file');

        const medications: Medication[] = [];

        createReadStream(MEDICATIONS_FILE_PATH, { end: 100000 })
            .pipe(parse())
            .on('data', (infarmedMedication) => {
                const medication =
                    parseInfarmedMedicationToMedication(infarmedMedication);

                medications.push(medication);
            })
            .on('finish', () => {
                resolve(medications);
            });
    });

if (process.argv.length !== 2) {
    // 2 arguments: node, path where script is running. No additional arguments
    console.log('Usage: yarn cmd:populate-medications');
    process.exit(1);
}

(async (): Promise<number> => {
    const batch = writeBatch(db);

    const medications = await readMedications();
    console.log(`Read ${medications.length} medications from file`);

    await Promise.all(
        medications.map(async (medication) => {
            return await createMedication(db, medication);
        })
    );

    await batch.commit();

    return medications.length;
})()
    .then((len: number) => {
        console.log(`All done ${len} medications created`);
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
