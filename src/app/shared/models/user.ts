export interface User {
  uid?: string;
  email: string;
  firstname: string;
  lastname: string;
  admin: boolean;
  nickname?: string;
  familyUid?: string;
  pictureURL?: string;
}
