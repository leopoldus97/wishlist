import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {admin} from 'firebase-admin/lib/auth';
import UserRecord = admin.auth.UserRecord;

export interface UserController {
  createDefaultImageForUser(snap: DocumentSnapshot, context: EventContext): Promise<any>;
  addIDToGroup(snap: DocumentSnapshot, context: EventContext): Promise<any>;
  deleteUser(user: UserRecord, context: EventContext): Promise<any>;
}
