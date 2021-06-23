import * as firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
  apiKey: "AIzaSyANhbRogUt47LNTnJYYD6uxY5L56Ub12w4",
  authDomain: "class76booksanta.firebaseapp.com",
  projectId: "class76booksanta",
  storageBucket: "class76booksanta.appspot.com",
  messagingSenderId: "880728690415",
  appId: "1:880728690415:web:bfa5686394dd577794951a"
};
  // Initialize Firebase
//  if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
// }

export default firebase.firestore();
