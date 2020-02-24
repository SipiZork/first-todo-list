import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp  = firebase.initializeApp({
  apiKey: "AIzaSyBTGgI5XyGhO7X48fqAnrsfPQA2mJH38X8",
  authDomain: "todo-lists-9b8a3.firebaseapp.com",
  databaseURL: "https://todo-lists-9b8a3.firebaseio.com",
  projectId: "todo-lists-9b8a3",
  storageBucket: "todo-lists-9b8a3.appspot.com",
  messagingSenderId: "284188549851",
  appId: "1:284188549851:web:50373cb39537139c6ee2fe",
  measurementId: "G-WJH1PP3VLC"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
