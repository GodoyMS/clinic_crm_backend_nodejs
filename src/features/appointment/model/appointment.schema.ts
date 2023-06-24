import { IAppointmentDocument } from '../interfaces/appointmentDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const appointmentSchema: Schema = new Schema({
  clinic:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserClinic' },
  patient:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPatient' },
  doctor:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDoctor' },
  dateStart:{type:Date,default:''},
  dateEnd:{type:Date,default:''},
  reason:{type:String}

});

const AppointmentModel: Model<IAppointmentDocument> = model<IAppointmentDocument>('Appointment', appointmentSchema, 'Appointment');
export { AppointmentModel };
