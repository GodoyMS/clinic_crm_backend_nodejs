import { ObjectId } from 'mongodb';

export interface ISignUpData {
  _id: ObjectId;
  uId: string;
  username:string;
  email: string;
  password: string;
}
