import { IUserDocument } from '../interfaces/userDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthPatient' },
  clinic:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserClinic' },
  email:{type:String,default:''},
  phone:{type:String,default:''},
  names:{type:String,default:''},
  age:{type:String,default:''},
  city:{type:String,default:''},
  sex:{type:String,default:''},
  clinicHistoy:[{type:String}],
  odontogram:[{type:String}],
  consent:[{type:String}],
  passwordResetToken: { type: String, default: ''},
  passwordResetExpires: { type: Number }
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('UserPatient', userSchema, 'UserPatient');
export { UserModel };
