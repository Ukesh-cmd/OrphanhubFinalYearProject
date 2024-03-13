// src/firebase.js

import firebase from 'firebase/pages';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  // Your Firebase config here
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
