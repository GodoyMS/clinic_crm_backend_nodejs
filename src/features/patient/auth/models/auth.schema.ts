import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@patient/auth/interfaces/authDocument.interface';
import { model, Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
//import { config } from '@configs/configEnvs';

// Design Pattern AAA / Security for Design (SBD): https://www.ticportal.es/glosario-tic/seguridad-diseno-sbd
const authSchema: Schema = new Schema(
  {
    clinicId:{type: mongoose.Schema.Types.ObjectId, ref: 'UserClinic'},
    uId: { type: 'String' },
    dni: { type: 'String' },
    email: { type: 'String' },
    password: { type: 'String' },
    createdAt: { type: Date, default: Date.now() }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// virtual methods / spaces methods
/*authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, Number(config.SALT_ROUND));
  this.password = hashedPassword;
  next();
});*/

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

/*authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, Number(config.SALT_ROUND));
};*/

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('AuthPatient', authSchema, 'AuthPatient');
export { AuthModel };
