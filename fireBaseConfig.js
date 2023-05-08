import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {/*Insert FIREBASE API KEY here*/};

export const myFireBase = initializeApp(firebaseConfig);
export const auth = getAuth(myFireBase);
export const db = initializeFirestore(myFireBase, {
  experimentalForceLongPolling:true,
});