import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { UserModel } from '@clinic/user/models/user.schema';
import mongoose from 'mongoose';

class UserService {
   public async addUserData(data: IUserDocument): Promise<void> {
      await UserModel.create(data);
   }

   public async getUserById(userId: string): Promise<IUserDocument> {
      const users: IUserDocument[] = await UserModel.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(userId) } },
         { $lookup: { from: 'AuthClinic', localField: 'authId', foreignField: '_id', as: 'authId' } },
         { $unwind: '$authId' },
         { $project: this.aggregateProject() },
      ]);
      return users[0];
   }
   public async getUserDocById(id: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOne({ _id: id }).exec()) as IUserDocument;
      return user;
   }

   public async deleteUserDocById(id: string): Promise<void> {
      await UserModel.deleteOne({ _id: id }).exec();
   }

   /*public async getUserByIdWithPopulate(userId: string): Promise<IUserDocument> {
    const user: IUserDocument = await UserModel
      .findOne({ _id: new mongoose.Types.ObjectId(userId) })
      .populate('authId', { username: 0, email: 0 }) as IUserDocument;
      return user;
  }*/

   private aggregateProject() {
      return {
         _id: 1,
         username: '$authId.username',
         uId: '$authId.uId',
         email: '$authId.email',
         createdAt: '$authId.createdAt',
         phone: 1,
         location: 1,
         specialty: 1,
      };
   }
}

export const userService: UserService = new UserService();
