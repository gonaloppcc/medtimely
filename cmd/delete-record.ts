import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { getFirestore, terminate } from 'firebase/firestore';
import { deleteRecord } from '../src/services/records';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.argv.length !== 4) {
    // 3 because the first argument is node, the second is the script name
    console.log('Usage: yarn cmd:createRecord <userId> <recordId>');
    process.exit(1);
}

const userId = process.argv[2];
const recordId = process.argv[3];

(async () => {
    try {
        await deleteRecord(db, userId, recordId);
    } catch (e) {
        console.error(e);
    }
})()
    .then(() => {
        console.log('Record deleted successfully');
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await terminate(db);
    });
