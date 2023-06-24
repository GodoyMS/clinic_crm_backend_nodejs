import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ILocation } from './location.interface';
//SOLID INTERFACE SEGRETATION

export interface IUser {
  _id: string | ObjectId;
  authId: string | ObjectId;
  uId: string;
  username: string;
  email: string;
  password?: string;
  profilePicture: string;
  phone:string;
  location: ILocation;
  doctors:mongoose.Types.ObjectId[];
  patients:mongoose.Types.ObjectId[];
  appointments:mongoose.Types.ObjectId[];
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt: Date;
}
