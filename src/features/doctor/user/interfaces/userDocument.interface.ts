import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUserDocument extends Document {
   _id: string | ObjectId;
   uId?: string;
   dni: string;
   profileImage: string;
   clinicId: mongoose.Types.ObjectId;
   authId: string | ObjectId;
   email?: string;
   job: string;
   password?: string;
   phone: string;
   names: string;
   age: number;
   city: string;
   sex: string;
   passwordResetToken?: string;
   passwordResetExpires?: number | string;
   createdAt?: Date;
   joinedAt: Date;
}
