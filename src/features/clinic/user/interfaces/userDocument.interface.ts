import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { INotificationSettings } from './notificationSettings.interface';
import { ISocialLinks } from './socialLinks.interface';
import { ILocation } from './location.interface';
export interface IUserDocument extends Document {
  _id: string | ObjectId;
  uId?: string;
  authId: string | ObjectId;
  username?: string;
  email?: string;
  password?: string;
  patients:mongoose.Types.ObjectId[];
  phone:string;
  doctors:mongoose.Types.ObjectId[];
  appointments:mongoose.Types.ObjectId[];
  location: ILocation;
  specialty:string;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt?: Date;
}
















