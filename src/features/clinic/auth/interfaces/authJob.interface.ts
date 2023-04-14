import { IAuthDocument } from './authDocument.interface';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';

export interface IAuthJob {
  value?: string | IAuthDocument | IUserDocument;
}
