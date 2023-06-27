import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION

export interface ISignUpDataAppointment {
   _id: ObjectId;
   clinic: ObjectId;
   patient: ObjectId;
   dateStart: Date;
   dateEnd: Date;
   doctor: ObjectId;
   reason: string;
}
