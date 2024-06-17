import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAP_CvLZB46WKPK2M2sf7zLcv94dsi3feY',
  authDomain: 'saltcontrol-369a5.firebaseapp.com',
  databaseURL: 'https://saltcontrol-369a5-default-rtdb.firebaseio.com',
  projectId: 'saltcontrol-369a5',
  storageBucket: 'saltcontrol-369a5.appspot.com',
  messagingSenderId: '842768331921',
  appId: '1:842768331921:web:9f6960ea94e8a171077b30',
  measurementId: 'G-WYN5KB8ZYE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const cloudDb = getFirestore(app);
export const db = getDatabase();

export const addData = async () => {
  const db = getDatabase();
  set(ref(db, 'operation/'), {
    time: 0,
  });
};

export const updateData = async (id: string) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `operation/time`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const db = getDatabase();
        const updates = {};
        //@ts-ignore
        updates['/operation/time'] = snapshot.val() + 1;
        //@ts-ignore
        updates['/operation/id'] = id;
        update(ref(db), updates);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
