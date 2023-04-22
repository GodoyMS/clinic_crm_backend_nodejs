import { IUserDocument } from '@patient/user/interfaces/userDocument.interface';
import { UserModel } from '@patient/user/models/user.schema';
import mongoose from 'mongoose';

class UserService {
  public async addUserData(data: IUserDocument): Promise<void> {
    await UserModel.create(data);
  }

  public async getUserById(userId: string): Promise<IUserDocument>{
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'AuthPatient', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() },
    ]);
    return users[0];
  }

  public async getUserByIdWithPopulate(userId: string): Promise<IUserDocument> {
    const user: IUserDocument = await UserModel
      .findOne({ _id: new mongoose.Types.ObjectId(userId) })
      .populate('authId', { username: 0, email: 0 })       as IUserDocument;
      return user;
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: '$authId.username',
      uId: '$authId.uId',
      email: '$authId.email',
      phone:1,
      names:1,
      age:1,
      sex:1,
      clinicHistory:1,
      odontogram:1,
      consent:1,

    };
  }
}

export const userService: UserService = new UserService();
