import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';

import { UserModel } from '@clinic/user/models/user.schema';
import { AuthModel } from '@clinic/auth/models/auth.schema';

import { Generators } from '@helpers/generators/generators';

class ClinicActionsService {

   public async getAuthClinicByEmail(email:string):Promise<IAuthDocument>{
      const clinic = (await AuthModel.findOne({email:email}).exec()) as IAuthDocument;
      return clinic;
   }

   public async updateClinicAuth(data:IAuthDocument,  ):Promise<void>{
      //
   }



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
}

export const clinicActionsService: ClinicActionsService = new ClinicActionsService();
