import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Group} from '../models/group';
import {User} from '../models/user';
import {Member} from '../models/member';
import {FileService} from './file.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private path = 'groups';

  // Save first document in snapshot of items received
  private firstInResponse: any = [];

  // Save last document in snapshot of items received
  private lastInResponse: any = [];

  // Maintain the count of clicks on Next Prev button
  paginationClickedCount = 0;

  // Keep the array of first document of previous pages
  private prevStrtAt: any = [];

  // Disable next and prev buttons
  disableNext = false;
  disablePrev = false;

  private currentGroups: Group[];

  constructor(private afs: AngularFirestore, private fs: FileService, private snackBar: MatSnackBar, private us: UserService) { }

  /*getGroupsForUser(userID: string): Observable<Group[]> {
    return this.afs.collection<Group>(this.path, ref => ref.where('memberID', 'array-contains', userID)
      .orderBy('name', 'asc')
      .limit(1)).snapshotChanges().pipe(map(response => {
        return response.map(snap => {
          return this.mapGroups(snap);
        });
      })
    );
  }
   */

  private mapGroups(data): Group {
    const group: Group = {
      id: data.id,
      name: data.name,
      members: this.mapMembers(data.members)
    };
    return group;
  }

  private mapMembers(members: Member[]): Member[] {
    return members.map(m => {
      const member: Member = {
        uid: m.uid,
        firstname: m.firstname,
        lastname: m.lastname,
        nickname: m.nickname || null,
        pictureURL: m.pictureURL || null
      };
      return member;
    });
  }

  /*joinGroup(user: User, groupID: string) {
    const mem: Member = {
      uid: user.uid,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      pictureURL: user.pictureURL
    };
    this.afs.collection(this.path).doc<Group>(groupID).valueChanges().toPromise().then((a) => {
      this.afs.collection(this.path).doc<Group>(groupID).update(a).then(() => this.snackBar.open('You have joined the group'));
    }).catch(error => this.snackBar.open('The ID does not exist\n' + error));
  }

  leaveGroup(user: User, group: Group) {
    const mem: Member = {
      uid: user.uid,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      pictureURL: user.pictureURL
    };
    const membersInGroup = group.members;
    const index = membersInGroup.indexOf(mem);
    membersInGroup.splice(index, 1);
    this.afs.collection(this.path).doc<Group>(group.id).update({members: membersInGroup});
  }*/

  createGroup(group: Group, user: User) {
    const mem: Member = {
      uid: user.uid,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      pictureURL: user.pictureURL
    };
    group.members.push(mem);
    this.afs.collection<Group>(this.path).add(group).then((a) => a.update({memberID: [user.uid]}).then(() => {
      this.snackBar.open('Group created');
    }));
  }

  /*deleteGroup(groupID: string): Promise<any> {
    return this.afs.collection(this.path).doc(groupID).delete().then(() => {
      this.snackBar.open('Group Deleted');
    });
  }*/

  getCurrentGroups(): Group[] {
    return this.currentGroups;
  }

  loadGroupsForUser(userID: string, loadLimit?: number) {
    this.afs.collection<Group>(this.path, ref => ref
      .where('memberID', 'array-contains', userID)
      .limit(loadLimit || 5)
      .orderBy('name', 'asc')
    ).snapshotChanges()
      .subscribe(response => {
        if (!response.length) {
          console.log('No Data Available');
          return false;
        }
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;

        this.currentGroups = response.map(data => {
          return this.mapGroups(data.payload.doc.data());
        });

        // Initialize values
        this.prevStrtAt = [];
        this.paginationClickedCount = 0;
        this.disableNext = false;
        this.disablePrev = false;

        // Push first item to use for Previous action
        this.push_prev_startAt(this.firstInResponse);
      }, error => {
        console.log(error);
      });
  }

  // Show previous set
  prevGroupsForUser(userID: string, loadLimit?: number) {
    this.disablePrev = true;
    this.afs.collection<Group>(this.path, ref => ref
      .where('memberID', 'array-contains', userID)
      .orderBy('name', 'asc')
      .startAt(this.get_prev_startAt())
      .endBefore(this.firstInResponse)
      .limit(loadLimit || 5)
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];

        this.currentGroups = response.docs.map(data => {
          return this.mapGroups(data.data());
        });

        // Maintaing page no.
        this.paginationClickedCount--;

        // Pop not required value in array
        this.pop_prev_startAt(this.firstInResponse);

        // Enable buttons again
        this.disablePrev = false;
        this.disableNext = false;
      }, error => {
        console.log(error);
        this.disablePrev = false;
      });
  }

  nextGroupsForUser(userID: string, loadLimit?: number) {
    this.disableNext = true;
    this.afs.collection<Group>(this.path, ref => ref
      .where('memberID', 'array-contains', userID)
      .limit(loadLimit || 5)
      .orderBy('name', 'asc')
      .startAfter(this.lastInResponse)
    ).get()
      .subscribe(response => {

        if (!response.docs.length) {
          this.disableNext = true;
          return;
        }

        this.firstInResponse = response.docs[0];

        this.lastInResponse = response.docs[response.docs.length - 1];

        this.currentGroups = response.docs.map(data => {
          return this.mapGroups(data.data());
        });

        this.paginationClickedCount++;

        this.push_prev_startAt(this.firstInResponse);

        this.disableNext = false;
      }, error => {
        console.log(error);
        this.disableNext = false;
      });
  }

  // Add document
  private push_prev_startAt(prevFirstDoc) {
    this.prevStrtAt.push(prevFirstDoc);
  }

  // Remove not required document
  private pop_prev_startAt(prevFirstDoc) {
    this.prevStrtAt.forEach(element => {
      if (prevFirstDoc.data().id === element.data().id) {
        element = null;
      }
    });
  }

  // Return the Doc rem where previous page will startAt
  private get_prev_startAt() {
    if (this.prevStrtAt.length > (this.paginationClickedCount + 1)) {
      this.prevStrtAt.splice(this.prevStrtAt.length - 2, this.prevStrtAt.length - 1);
    }
    return this.prevStrtAt[this.paginationClickedCount - 1];
  }

  addMemberToGroup(memberToAdd: string, group: Group) {
    if (group.members.find(member => member.uid === memberToAdd) === undefined){
      this.us.readUserWithPic(memberToAdd).subscribe(user => {
        const member = {
          uid: user.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          nickname: user.nickname,
          pictureURL: user.pictureURL
        };
        group.members.push(member);
        this.afs.collection<Group>(this.path).doc(group.id).update(group);
      });
  }else{
      console.log('this member is already in the group');
    }
  }

}

