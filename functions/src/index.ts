import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const serviceAccount = require("../secret.json");
const df = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wishlist-e6b33.firebaseio.com"
});

exports.createWishlist = functions.firestore.document('users/{uid}').onCreate(
  (snap, context) => {
    return df.getWishController().createWishlist(snap, context);
  }
);
