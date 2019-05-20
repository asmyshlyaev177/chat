import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { apiKey, appId, projectId, messagingSenderId } from './env';

const config = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId,
  appId
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };
