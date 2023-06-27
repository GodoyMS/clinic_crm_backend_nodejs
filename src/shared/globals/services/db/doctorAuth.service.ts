import { IAuthDocument } from '@doctor/auth/interfaces/authDocument.interface';
import { Generators } from '@helpers/generators/generators';
import { AuthModel } from '@doctor/auth/models/auth.schema';
class AuthService {
   public async createAuthUser(data: IAuthDocument): Promise<void> {
      await AuthModel.create(data);
   }

   public async getUserByDniOrEmail(dni: string, email: string): Promise<IAuthDocument> {
      const query = {
         $or: [{ dni: dni }, { email: Generators.lowerCase(email) }],
      };
      const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;

      return user;
   }

   public async getAuthUserByEmail(email: string): Promise<IAuthDocument> {
      const user: IAuthDocument = (await AuthModel.findOne({ email }).exec()) as IAuthDocument;
      return user;
   }

   public async getAuthUserByDni(dni: string): Promise<IAuthDocument> {
      const userPatient: IAuthDocument = (await AuthModel.findOne({ dni }).exec()) as IAuthDocument;
      return userPatient;
   }
}

export const authService: AuthService = new AuthService();
