import {UserRepository} from './user.repository';

export class UserService {

  constructor(private repo: UserRepository) {}

  deleteUser(uid: string): Promise<any> {
    return this.repo.deleteUser(uid);
  }

  addIDToGroup(id: string): Promise<any> {
    return this.repo.addGroupIDToGroup(id);
  }

  createDefaultImageForUser(uid: string): Promise<any> {
    return this.repo.createDefaultImageForUser(uid);
  }

}
