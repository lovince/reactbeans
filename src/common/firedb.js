import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCGNKdtHcv0KpVLoGLi3pxKt6y_cezK9MU",
  authDomain: "beans-14e5b.firebaseapp.com",
  databaseURL: "https://beans-14e5b.firebaseio.com",
  storageBucket: "beans-14e5b.appspot.com",
  messagingSenderId: "460517820924"
};

firebase.initializeApp(config);
export default {
  db: firebase.database(),
  entriesLoc: '/data/entries',
  tagsLoc: '/data/entryTags',
}

function moveFbRecord(oldRef, newRef) {
     oldRef.once('value', function(snap)  {
          newRef.set( snap.val(), function(error) {
               if( !error ) {  oldRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}
