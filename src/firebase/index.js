
import * as firebase from 'firebase';
import "firebase/storage";
const REACT_APP_API_KEY =`${process.env.REACT_APP_API_KEY}`
const REACT_APP_AUTH_DOMAIN =`${process.env.REACT_APP_AUTH_DOMAIN}`
const REACT_APP_DATABASE_URL =`${process.env.REACT_APP_DATABASE_URL}`
const REACT_APP_PROJECT_ID =`${process.env.REACT_APP_PROJECT_ID}`
const REACT_APP_STORAGE_BUCKET =`${process.env.REACT_APP_STORAGE_BUCKET}`
const REACT_APP_MESSAGING_SENDERID =`${process.env.REACT_APP_MESSAGING_SENDERID}`
const REACT_APP_APP_ID =`${process.env.REACT_APP_APP_ID}`
const REACT_APP_MEASUREMENT_ID =`${process.env.REACT_APP_MEASUREMENT_ID}`

const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDERID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
  };
  const fb=firebase.initializeApp(firebaseConfig)
  const storage=fb.storage();
  const db=fb.database();
  const fireStore=fb.firestore();
  export {fireStore,storage,db,fb as default};

  