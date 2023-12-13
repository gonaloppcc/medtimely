import { MetaTypeCreator, getFirelord } from 'firelordjs';
import { db } from '../../firebaseConfig';

export type Medication = MetaTypeCreator<{
  name: string;
},
  'medications',
  string
>

export const medication = getFirelord<Medication>(db, 'medications');