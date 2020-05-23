import {UserController} from './user.controller';
import {UserService} from './user.service';
import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {admin} from 'firebase-admin/lib/auth';
import UserRecord = admin.auth.UserRecord;

export class UserControllerFirebase implements UserController {

  constructor(private serv: UserService) {}

  deleteUser(user: UserRecord, context: EventContext): Promise<any> {
    return this.serv.deleteUser(user.uid);
  }

  addIDToGroup(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    return this.serv.addIDToGroup(context.params.id);
  }

  createDefaultImageForUser(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    return this.serv.createDefaultImageForUser(context.params.uid);
  }

}
