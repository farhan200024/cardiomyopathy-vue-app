import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//adding the firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfYBgvCS1Wu2MIpUaCqObkrG5bpq87WmM",
  authDomain: "cardiomyopathy-auth.firebaseapp.com",
  projectId: "cardiomyopathy-auth",
  storageBucket: "cardiomyopathy-auth.appspot.com",
  messagingSenderId: "648071341133",
  appId: "1:648071341133:web:b3083b0b1f2ddb6deaa804"
};

// initializing the firebase configuration
firebase.initializeApp(firebaseConfig);

// used to check the authentication service
const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
// retrieves the serve timestamp method
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }