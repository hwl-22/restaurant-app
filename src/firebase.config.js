import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDwXyeom4RwBHLXzSV4LKPXd4CEmScAZdw',
  authDomain: 'restaurant-app-71c0e.firebaseapp.com',
  databaseURL:
    'https://restaurant-app-71c0e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'restaurant-app-71c0e',
  storageBucket: 'restaurant-app-71c0e.appspot.com',
  messagingSenderId: '715469891510',
  appId: '1:715469891510:web:8f05b9d0f951a5dfd34317',
};

const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
