import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCpOBrufJWM2NzisY41y9l-ugA3e6d-dNk",
  authDomain: "test-13c20.firebaseapp.com",
  projectId: "test-13c20",
  storageBucket: "test-13c20.appspot.com",
  messagingSenderId: "65268902338",
  appId: "1:65268902338:web:a3f760574a95200b400e5b",
  measurementId: "G-X60398CTLH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
