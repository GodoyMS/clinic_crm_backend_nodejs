import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION

export interface ISignUpData {
  _id: ObjectId;
  clinicId:ObjectId;
  uId: string;
  dni:string;
  names: string;
  password: string;
}
