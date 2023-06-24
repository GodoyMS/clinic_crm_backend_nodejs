import { IUserDocument } from './userDocument.interface';
//SOLID INTERFACE SEGRETATION

export interface IAllUsers {
  users: IUserDocument[];
  totalUsers: number;
}
