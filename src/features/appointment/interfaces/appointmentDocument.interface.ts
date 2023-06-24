import mongoose, { Date, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

   export interface IAppointmentDocument extends Document {
   _id: string | ObjectId;
   clinic:mongoose.Types.ObjectId;
   patient:mongoose.Types.ObjectId;
   dateStart:Date,
   dateEnd:Date,
   doctor:mongoose.Types.ObjectId;
   reason:string

   }

