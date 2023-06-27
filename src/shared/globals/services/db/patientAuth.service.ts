import { IAuthDocument } from '@patient/auth/interfaces/authDocument.interface';

import { AuthModel } from '@patient/auth/models/auth.schema';
import { Generators } from '@helpers/generators/generators';

class AuthService {
   public async createAuthUser(data: IAuthDocument): Promise<void> {
      await AuthModel.create(data);
   }

   public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
      const query = {
         $or: [{ username: Generators.firstLetterUppercase(username) }, { email: Generators.lowerCase(email) }],
      };
      const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;

      return user;
   }

   public async getAuthUserByUsername(username: string): Promise<IAuthDocument> {
      const user: IAuthDocument = (await AuthModel.findOne({ username }).exec()) as IAuthDocument;
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
