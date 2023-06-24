import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { IUserDocument as IUserDocumentPatient } from '@patient/user/interfaces/userDocument.interface';
import { IUserDocument as IUserDocumentDoctor } from '@doctor/user/interfaces/userDocument.interface';
import { UserModel } from '@clinic/user/models/user.schema';
import { AuthModel } from '@clinic/auth/models/auth.schema';
import { UserModel as UserModelPatient } from '@patient/user/models/user.schema';
import { UserModel as UserModelDoctor } from '@doctor/user/models/user.schema';
import { Generators } from '@helpers/generators/generators';
import { AppointmentModel } from '@root/features/appointment/model/appointment.schema';
import { IAppointmentDocument } from '@root/features/appointment/interfaces/appointmentDocument.interface';

class ClinicActionsService {

   public async getAuthClinicByEmail(email:string):Promise<IAuthDocument>{
      const clinic = (await AuthModel.findOne({email:email}).exec()) as IAuthDocument;
      return clinic;
   }

   public async updateClinicAuth(data:IAuthDocument,  ):Promise<void>{
      //
   }

   public async getAllPatientsWithClinicId(id:string):Promise<[IUserDocumentPatient]>{
      const patients= (await UserModelPatient.find({clinic:id})) as [IUserDocumentPatient];
      return patients;

   }

   public async getAllDoctorsWithClinicId(id:string):Promise<[IUserDocumentDoctor]>{
      const doctors= (await UserModelDoctor.find({clinic:id}).populate('clinic').exec()) as [IUserDocumentDoctor];
      return doctors;

   }

   public async getAllAppointmentsWithClinicId(id:string):Promise<[IAppointmentDocument]>{
      const doctors= (await AppointmentModel.find({clinic:id}).populate('patient').populate('doctor').exec()) as [IAppointmentDocument];
      return doctors;

   }

   public async getAppointmentById(data:IAppointmentDocument):Promise<IAppointmentDocument>{
      const appointment=(await AppointmentModel.findById(data._id).populate('patient').populate('doctor').exec()) as IAppointmentDocument;
      return appointment;
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
