const functions = require('firebase');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const firebaseConfig = {
    apiKey: 'AIzaSyBFfUi9A7dJc8E7-NAAyh68OW6QFokJN3o',
    authDomain: 'cs252-lab6-58dac.firebaseapp.com',
    databaseURL: 'https://cs252-lab6-58dac.firebaseio.com',
    storageBucket: 'cs252-lab6-58dac.appspot.com'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

console.log('Authenticating...');
firebase.auth().signInWithEmailAndPassword('your@email.com', 'YoUrPaSsWoRd').catch(error => {
    console.log('Error while authenticating:', error);
}).then(loginObject => {
    if (loginObject) {
        console.log('Success!!');
        // now do your thing!
        let something = db.ref('users/' + loginObject.uid + '/something');
        // do something with something
    } else {
        console.log('Oops, something went wrong while authenticating:', loginObject);
    }
});
