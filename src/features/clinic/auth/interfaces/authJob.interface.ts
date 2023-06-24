import { IAuthDocument } from './authDocument.interface';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';

//SOLID INTERFACE SEGRETATION

export interface IAuthJob {
  value?: string | IAuthDocument | IUserDocument;
}
