import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION

export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  clinicId:ObjectId;
  uId: string;
  dni:string;
  names:string;
  password?: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
