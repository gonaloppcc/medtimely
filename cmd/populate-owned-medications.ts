// noinspection SpellCheckingInspection

import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { OwnedMedicationData } from '../src/model/ownedMedication';
import { getMedication } from '../src/services/medications';
import { Medication } from '../src/model/medication';
import { createOwnedMedication } from '../src/services/ownedMedication';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.argv.length !== 3) {
    // 3 because the first argument is node, the second is the script name
    console.log('Usage: yarn cmd:populate-owned-medications <userId>');
    process.exit(1);
}

const userId = process.argv[2];
// TODO: Por buscopan, levocetirizina, antihistmanico, gripe
// Usar algum exemplo que não seja comprimido
const incompleteOwnedMedications = [
    // Paracetamol + Caffeine
    {
        medicationId: 'ChH3HhD002Jx2gf5oYeh',
        stock: 20,
    },
    // Brufen
    {
        medicationId: 'rAKvM2MnV3sH7xLSRC0T',
        stock: 28,
    },
    // Drosperinona
    {
        medicationId: 'Cm3BkWZHKLwbRwhhND0h',
        stock: 56,
    },
    // Glucosamina
    {
        medicationId: 'IDOCpPV7bqcK81IwJI0y',
        stock: 30,
    },
    // Eletrólitos
    {
        medicationId: 'MaKk4YMC5meA4WXyLwHb',
        stock: 56,
    },
];

Promise.all(
    incompleteOwnedMedications.map(
        async (incompleteOwned: Partial<OwnedMedicationData>) => {
            const medication: Medication = await getMedication(
                db,
                incompleteOwned.medicationId!
            );
            const ownedMedicationData: OwnedMedicationData = {
                ...medication,
                ...(incompleteOwned as OwnedMedicationData),
            };
            return await createOwnedMedication(db, userId, ownedMedicationData);
        }
    )
)
    .then(() => {
        console.log('All done');
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
