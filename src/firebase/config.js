import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//adding the firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGCWBCLfWOgBCB2-nBEHcJcyT1EUHD1UE",
  authDomain: "cardiomyopathy-farhan.firebaseapp.com",
  projectId: "cardiomyopathy-farhan",
  storageBucket: "cardiomyopathy-farhan.appspot.com",
  messagingSenderId: "262113426024",
  appId: "1:262113426024:web:4bb490ad73ecf40aa919dd",
};

// initializing the firebase configuration
firebase.initializeApp(firebaseConfig);

// uset to connect to authentication service
const projectAuth = firebase.auth()

// used to connect to the firestore service
const projectFirestore = firebase.firestore()

// retrieves the serve timestamp method
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }