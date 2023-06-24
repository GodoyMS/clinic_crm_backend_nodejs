import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION

export interface ISignUpData {
   _id: ObjectId;
   uId: string;
   username: string;
   email: string;
   password: string;
}
