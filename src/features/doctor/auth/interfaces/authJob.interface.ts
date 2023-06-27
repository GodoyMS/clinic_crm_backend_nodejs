import { IAuthDocument } from './authDocument.interface';
import { IUserDocument } from '@doctor/user/interfaces/userDocument.interface';
//SOLID INTERFACE SEGRETATION

export interface IAuthJob {
   value?: string | IAuthDocument | IUserDocument;
}
