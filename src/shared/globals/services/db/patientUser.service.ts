import { IAuthDocument } from '@patient/auth/interfaces/authDocument.interface';
import { AuthModel } from '@patient/auth/models/auth.schema';
import { IUserDocument } from '@patient/user/interfaces/userDocument.interface';
import { UserModel } from '@patient/user/models/user.schema';
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

   public async getUserAuthById(id:string):Promise<IAuthDocument>{
      const authPatient:IAuthDocument=(await AuthModel.findOne({_id:id}).exec()) as IAuthDocument;
      return authPatient;
   }

   public async deleteUserAuthById(id:string):Promise<IAuthDocument>{
      const authPatient:IAuthDocument=(await AuthModel.findByIdAndRemove(id).exec()) as IAuthDocument;
      return authPatient;
   }

   public async getUserByIdWithPopulate(userId: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).populate(
         'authId',
         { username: 0, email: 0 },
      )) as IUserDocument;
      return user;
   }

   public async updateClinicHistoryPatientById(userId: string, newClinicHistoryURL: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOneAndUpdate(
         { _id: userId },
         { $push: { clinicHistory: newClinicHistoryURL } },
         { new: true },
      )) as IUserDocument;
      return user;
   }
   public async deleteClinicHistoryPatientById(userId: string, clinicHistoryURL: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOneAndUpdate(
         { _id: userId },
         { $pull: { clinicHistory: clinicHistoryURL } },
         { new: true },
      )) as IUserDocument;
      return user;
   }

   public async updateOdontogramPatientById(userId: string, newOdontogramURL: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOneAndUpdate(
         { _id: userId },
         { $push: { odontogram: newOdontogramURL } },
         { new: true },
      )) as IUserDocument;
      return user;
   }

   public async deleteODontogramPatientById(userId: string, odontogramURL: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOneAndUpdate(
         { _id: userId },
         { $pull: { odontogram: odontogramURL } },
         { new: true },
      )) as IUserDocument;
      return user;
   }
   public async updateConsentPatientById(userId: string, newConsentURL: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOneAndUpdate(
         { _id: userId },
         { $push: { consent: newConsentURL } },
         { new: true },
      )) as IUserDocument;
      return user;
   }

   public async deleteConsentPatientById(userId: string, consentURL: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOneAndUpdate(
         { _id: userId },
         { $pull: { consent: consentURL } },
         { new: true },
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
         clinicHistory: 1,
         odontogram: 1,
         consent: 1,
      };
   }
}

export const userService: UserService = new UserService();
