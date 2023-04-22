import { IUserDocument } from '../interfaces/userDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthClinic' },
  //patients:[{type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}],
  //doctors:[{type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}],
  //appointments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}],
  username:{type:String,default:''},
  email:{type:String,default:''},
  phone:{type:String,default:''},
  location:{
      district: { type: String, default: '' },
      province: { type: String, default: '' },
      region: { type: String, default: '' },
      address: { type: String, default: '' }
  },
  specialty: { type: String, default: '' },
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: { type: Number },
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('UserClinic', userSchema, 'UserClinic');
export { UserModel };

