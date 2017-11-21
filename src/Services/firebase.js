import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

Firebase.initializeApp(firebaseConfig)

Firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    console.log(error)
})

export default {
    firebase: Firebase,
    db: Firebase.database(),
    getRef: function (collection) {
        return this.db.ref(collection)
    }
}