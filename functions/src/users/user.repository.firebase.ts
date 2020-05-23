import {UserRepository} from './user.repository';
import * as admin from 'firebase-admin';

export class UserRepositoryFirebase implements UserRepository{



  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  storage(): admin.storage.Storage {
    return admin.storage();
  }

  deleteUser(uid: string): Promise<any> {
    return this.deleteUserFromStorage(uid).then(() => {
        this.deleteUserFromUsers(uid).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  deleteUserFromStorage(uid: string): Promise<any> {
    const bucket = this.storage().bucket();

    return bucket.deleteFiles({
      prefix: `${uid}/profile`
    });
  }

  /*deleteUserFromGroups(uid: string): Promise<any> {
    return this.db().collection('groups').where('memberID', 'array-contains', uid).get().then(d => d.docs.forEach(dok => {
      const idList = dok.get('memberID') as string[];
      const index = idList.indexOf(uid);
      idList.splice(index, 1);
      const memberList = dok.get('members');
      memberList.splice(index, 1);
    }));
  }*/

  deleteUserFromUsers(uid: string): Promise<any> {
    return this.db().doc(`users/${uid}`).delete();
  }

  addGroupIDToGroup(groupID: string): Promise<any> {
    return this.db().doc(`groups/${groupID}`).update({id: groupID});
  }

  createDefaultImageForUser(uid: string): Promise<any> {
    const bucket = this.storage().bucket();

    return bucket.file('defaultUserIcon.png').copy(`${uid}/profile`);
  }

}


