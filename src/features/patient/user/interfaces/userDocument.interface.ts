import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  uId?: string;
  authId: string | ObjectId;
  email?: string;
  password?: string;
  phone:string;
  names: string;
  age:number;
  city:string;
  sex:string;
  clinic:mongoose.Types.ObjectId;
  clinicHistory:[string];
  odontogram:[string];
  consents:[string];
  appointments:mongoose.Types.ObjectId[];
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt?: Date;
}

