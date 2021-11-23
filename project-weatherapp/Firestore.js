import { firebase } from '@firebase/app';
import '@firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCN2YHr1JAVlRDB762dRavbBI4S1gHFRow",
  authDomain: "yakuza-ce202.firebaseapp.com",
  projectId: "yakuza-ce202",
  storageBucket: "yakuza-ce202.appspot.com",
  messagingSenderId: "160026145725",
  appId: "1:160026145725:web:b7dcae7453f05aa47418d4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

export default firestore;


