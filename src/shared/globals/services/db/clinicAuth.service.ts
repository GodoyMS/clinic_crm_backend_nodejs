import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';

import { AuthModel } from '@clinic/auth/models/auth.schema';
import { Generators } from '@helpers/generators/generators';

class AuthService {

  public async createAuthUser(data: IAuthDocument): Promise<void> {
    await AuthModel.create(data);
  }

  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {

    const query = {
      $or: [{ username: Generators.firstLetterUppercase(username) }, { email: Generators.lowerCase(email) }]
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
 public async getAuthUserById(id:string):Promise<IAuthDocument>{
   const user: IAuthDocument = (await AuthModel.findOne({ _id: id }).exec()) as IAuthDocument;
   return user;
 }
}

export const authService: AuthService = new AuthService();
