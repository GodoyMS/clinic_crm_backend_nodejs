import { IAuthDocument } from '@doctor/auth/interfaces/authDocument.interface';
import { AuthModel } from '@doctor/auth/models/auth.schema';
import { IUserDocument } from '@doctor/user/interfaces/userDocument.interface';
import { UserModel } from '@doctor/user/models/user.schema';
import mongoose from 'mongoose';

class UserService {
   public async addUserData(data: IUserDocument): Promise<void> {
      await UserModel.create(data);
   }

   public async getUserById(userId: string): Promise<IUserDocument> {
      const users: IUserDocument[] = await UserModel.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(userId) } },
         { $lookup: { from: 'AuthPatient', localField: 'authId', foreignField: '_id', as: 'authId' } },
         { $unwind: '$authId' },
         { $project: this.aggregateProject() },
      ]);
      return users[0];
   }

   public async getUserDocById(id: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOne({ _id: id }).exec()) as IUserDocument;
      return user;
   }
   public async deleteUserDocById(id: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findByIdAndRemove(id).exec()) as IUserDocument;
      return user;
   }

   public async updateProfileImageById(id: string, url: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findByIdAndUpdate(
         id,
         { profileImage: url },
         { new: true },
      ).exec()) as IUserDocument;
      return user;
   }

   public async getUserAuthById(id: string): Promise<IAuthDocument> {
      const authPatient: IAuthDocument = (await AuthModel.findOne({ _id: id }).exec()) as IAuthDocument;
      return authPatient;
   }

   public async deleteUserAuthById(id: string): Promise<IAuthDocument> {
      const authPatient: IAuthDocument = (await AuthModel.findByIdAndRemove(id).exec()) as IAuthDocument;
      return authPatient;
   }

   public async getUserByIdWithPopulate(userId: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).populate(
         'authId',
         { dni: 0, email: 0 },
      )) as IUserDocument;
      return user;
   }

   private aggregateProject() {
      return {
         _id: 1,
         username: '$authId.username',
         uId: '$authId.uId',
         email: '$authId.email',
         phone: 1,
         names: 1,
         age: 1,
         sex: 1,
      };
   }
}

export const userService: UserService = new UserService();
