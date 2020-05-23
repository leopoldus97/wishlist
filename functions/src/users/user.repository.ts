export interface UserRepository {

  createDefaultImageForUser(uid: string): Promise<any>;

  addGroupIDToGroup(groupID: string): Promise<any>;

  deleteUser(uid: string): Promise<any>;

}
