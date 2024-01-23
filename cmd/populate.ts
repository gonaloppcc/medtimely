import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { getFirestore, terminate, writeBatch } from 'firebase/firestore';
import { PlannedMedication } from '../src/model/ownedMedication';
import { getMedications } from '../src/services/medications';
import { createOwnedMedicationWithMedicationId } from '../src/services/ownedMedication';
import { randomNumber } from './random';
import { createPlannedMedication } from '../src/services/plannedMedication/plannedMedication';
import { MedicationRecordWithoutMedication } from '../src/model/medicationRecord';
import { createRecordWithMedicationId } from '../src/services/records';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.argv.length !== 3) {
    // 3 because the first argument is node, the second is the script name
    console.log(
        'Usage: yarn cmd:populate-user-records <userId> <numberOfMedications>'
    );
    process.exit(1);
}

const userId = process.argv[2];
const numberOfMedicationsArg = process.argv[3];

// Populates all data for a user

// Entities to populate:
// - MedicationRecord
// - OwnedMedication
// - PlannedMedication
// - Group

const MIN_OWNED_MEDICATION_STOCK = 5;
const MAX_OWNED_MEDICATION_STOCK = 30;

const populateOwnedMedications = async (
    medicationIds: string[]
): Promise<string[]> => {
    const batch = writeBatch(db);
    const ownedMedicationIds: string[] = [];

    for (const medicationId of medicationIds) {
        const stock = randomNumber(
            MIN_OWNED_MEDICATION_STOCK,
            MAX_OWNED_MEDICATION_STOCK
        );

        const ownedMedication = {
            stock,
            medicationId,
        };

        const ownedMedicationId = await createOwnedMedicationWithMedicationId(
            db,
            userId,
            ownedMedication
        );

        ownedMedicationIds.push(ownedMedicationId);
    }

    await batch.commit();

    return ownedMedicationIds;
};

const MIN_DOSE_TO_BE_TAKEN = 1;
const MAX_DOSE_TO_BE_TAKEN = 5;

const populatePlannedMedications = async (ownedMedicationIds: string[]) => {
    const batch = writeBatch(db);

    for (const ownedMedicationId of ownedMedicationIds) {
        const plannedMedication: Omit<PlannedMedication, 'ownedMedication'> = {
            doseToBeTaken: randomNumber(
                MIN_DOSE_TO_BE_TAKEN,
                MAX_DOSE_TO_BE_TAKEN
            ),
            schedule: {
                startDate: new Date(),
                endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
                timeBetweenDosesInHours: 6,
            },
        };

        await createPlannedMedication(
            db,
            userId,
            plannedMedication,
            `/${ownedMedicationId}`
        );
    }

    await batch.commit();
};

const populateRecords = async (
    medicationIds: string[],
    ownedMedicationIds: string[]
) => {
    const batch = writeBatch(db);

    for (let i = 0; i < medicationIds.length; i++) {
        const medicationId = medicationIds[i];
        const ownedMedicationId = ownedMedicationIds[i];

        const ownedMedicationRef = ownedMedicationId;
        const record: MedicationRecordWithoutMedication = {
            isPlanned: true,
            ownedMedicationRef,
            units: randomNumber(MIN_DOSE_TO_BE_TAKEN, MAX_DOSE_TO_BE_TAKEN),
            scheduledTime: new Date(),
            missed: Math.random() < 0.3, // get a false boolean with higher probability
        };

        await createRecordWithMedicationId(db, userId, record, medicationId);
    }

    await batch.commit();
};
const populateGroups = async () => {
    // TODO
};

const DEFAULT_NUMBER_OF_MEDICATIONS = 10;
const numberOfMedications =
    parseInt(numberOfMedicationsArg) || DEFAULT_NUMBER_OF_MEDICATIONS;
const populate = async () => {
    const medicationIds = (await getMedications(db, numberOfMedications)).map(
        (medication) => medication.id
    );

    const ownedMedicationsPopulated =
        await populateOwnedMedications(medicationIds);
    await populatePlannedMedications(ownedMedicationsPopulated);
    await populateRecords(medicationIds, ownedMedicationsPopulated);
    await populateGroups();
};

populate()
    .then(() => {
        console.log('All entities populated');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await terminate(db);
        console.log('Firestore connection terminated');
    });
