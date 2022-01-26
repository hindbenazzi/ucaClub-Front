import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyATR6aCNuOfrnqwkidX-zzJoZqUAu7yx_M",
  authDomain: "ucaauth.firebaseapp.com",
  projectId: "ucaauth",
  storageBucket: "ucaauth.appspot.com",
  messagingSenderId: "215464496962",
  appId: "1:215464496962:web:03b26cac0dce15da0cc2db",
  measurementId: "G-H6J5CSZZN0"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase};
