import {
    OwnedMedication,
    OwnedMedicationData,
    PlannedMedication,
} from '../../model/ownedMedication';
import { collection, Firestore, getDocs, query } from 'firebase/firestore';

export const getPlannedMedications = async (
    db: Firestore,
    uid: string
): Promise<PlannedMedication[]> => {
    const q = query(collection(db, 'users', uid, 'plannedMedications'));
    try {
        const matchingDocs = await getDocs(q);
        console.log('matchingDocs', matchingDocs);
        return matchingDocs.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as PlannedMedication;
        });
    } catch (e) {
        throw new Error('Error getting planned medications');
    }
};
