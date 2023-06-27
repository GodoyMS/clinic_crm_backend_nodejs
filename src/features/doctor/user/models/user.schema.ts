import { IUserDocument } from '../interfaces/userDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
   authId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthDoctor' },
   clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'UserClinic' },
   dni: { type: String, default: '' },
   profileImage: { type: String, default: '' },
   password: { type: String, default: '' },
   email: { type: String, default: '' },
   job: { type: String, default: '' },
   joinedAt: { type: Date, default: null },
   phone: { type: String, default: '' },
   names: { type: String, default: '' },
   age: { type: String, default: '' },
   city: { type: String, default: '' },
   sex: { type: String, default: '' },
   passwordResetToken: { type: String, default: '' },
   passwordResetExpires: { type: Number },
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('UserDoctor', userSchema, 'UserDoctor');
export { UserModel };
