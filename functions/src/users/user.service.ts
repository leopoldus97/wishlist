import {UserRepository} from './user.repository';

export class UserService {

  constructor(private repo: UserRepository) {}

  deleteUser(uid: string): Promise<any> {

    if(uid === undefined)
      return Promise.reject('Cannot delete undefined uid');

    if(uid === null)
      return Promise.reject('Cannot delete null uid');

    return this.repo.deleteUser(uid);
  }

  addIDToGroup(id: string): Promise<any> {
    if(id === undefined)
      return Promise.reject('Cannot add undefined uid');

    if(id === null)
      return Promise.reject('Cannot add null uid');

    return this.repo.addGroupIDToGroup(id);
  }

  createDefaultImageForUser(uid: string): Promise<any> {
    if(uid === undefined)
      return Promise.reject('Cannot create image for undefined uid');

    if(uid === null)
      return Promise.reject('Cannot create image for null uid');

    return this.repo.createDefaultImageForUser(uid);
  }

}
