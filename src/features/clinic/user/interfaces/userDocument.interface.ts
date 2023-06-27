import  { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ILocation } from './location.interface';

//SOLID INTERFACE SEGRETATION

export interface IUserDocument extends Document {
   _id: string | ObjectId;
   uId?: string;
   authId: string | ObjectId;
   username: string;
   email: string;
   password?: string;
   phone: string;
   location: ILocation;
   specialty: string;
   passwordResetToken?: string;
   passwordResetExpires?: number | string;
   createdAt?: Date;
}
