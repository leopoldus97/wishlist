import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const serviceAccount = require("../secret.json");
const df = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wishlist-e6b33.firebaseio.com",
  storageBucket: "gs://wishlist-e6b33.appspot.com"
});

exports.createWishlist = functions.firestore.document('users/{uid}').onCreate(
  (snap, context) => {
    return df.getWishController().createWishlist(snap, context);
  }
);

exports.deleteUserWish = functions.firestore.document('users/{uid}').onDelete(
  (snap, context) => {
    return df.getWishController().deleteUserWishes(snap, context);
  }
)

exports.deleteUser = functions.auth.user().onDelete(
  (user, context) => {
    return df.getUserController().deleteUser(user, context);
  }
);

exports.addIDToGroup = functions.firestore.document('groups/{id}').onCreate(
  (snap, context) =>{
    return df.getUserController().addIDToGroup(snap, context);
  }
);

exports.addDefaultImage = functions.firestore.document('users/{uid}').onCreate(
  (snap, context) => {
    return df.getUserController().createDefaultImageForUser(snap, context);
  }
);
