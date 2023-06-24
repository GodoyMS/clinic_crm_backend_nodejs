import { IAuthDocument } from './authDocument.interface';
import { IUserDocument } from '@patient/user/interfaces/userDocument.interface';
//SOLID INTERFACE SEGRETATION

export interface IAuthJob {
  value?: string | IAuthDocument | IUserDocument;
}
