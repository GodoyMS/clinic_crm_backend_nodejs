import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { config } from '@configs/configEnvs';
import { ISignUpData } from '@clinic/auth/interfaces/signUpData.interface';
import { ISignUpData as ISignUpDataPatient } from '@patient/auth/interfaces/signUpData.interface';
import { ISignUpData as ISignUpDataDoctor } from '@doctor/auth/interfaces/signUpData.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { IAuthDocument as IAuthDocumentPatient } from '@patient/auth/interfaces/authDocument.interface';
import { IUserDocument as IUserDocumentPatient } from '@patient/user/interfaces/userDocument.interface';
import { IUserDocument as IUserDocumentDoctor } from '@doctor/user/interfaces/userDocument.interface';
import { IAuthDocument as IAuthDocumentDoctor } from '@doctor/auth/interfaces/authDocument.interface';
export abstract class SignUpUtility {
  protected signToken(data: IAuthDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        uId: data.uId,
        email: data.email,
        username:data.username

      },
      config.JWT_TOKEN!
    );
  }

  protected signUpData(data: ISignUpData): IAuthDocument {
    const { _id, email, uId,username, password } = data;
    return {
      _id,
      uId,
      username,
      email: Generators.lowerCase(email),
      password,
      createdAt: new Date()
    } as IAuthDocument;
  }
  protected signUpPatient(data:ISignUpDataPatient):IAuthDocumentPatient{
   const { _id,clinicId, uId,dni,names, password } = data;
   return {
     _id,
     clinicId,
     uId,
     dni,
     names,
     password,
     createdAt: new Date()
   } as IAuthDocumentPatient;
  }

  protected signUpDoctor(data:ISignUpDataDoctor):IAuthDocumentDoctor{
   const { _id,clinicId, uId,dni,job,names, password } = data;
   return {
     _id,
     clinicId,
     uId,
     job,
     dni,
     names,
     password,
     createdAt: new Date()
   } as IAuthDocumentDoctor;
  }




  protected userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id,  email, uId,username, password  } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username,
      specialty:'',
      email,
      password,
      phone: '',
      location: {
        district: '',
        province: '',
        region: '',
        address: ''
      },

    } as unknown as IUserDocument;
  }


  protected patientData(data: IAuthDocumentPatient, userObjectId: ObjectId): IUserDocumentPatient {
   const { _id,clinicId,  uId,dni,names, password,  } = data;
   return {
     _id: userObjectId,
     authId: _id,
     uId,
     dni,
     clinic:clinicId,
     password,
     phone: '',
     names,
     age:'',
     city:'',
     sex:'',
     clinicHistory:[],
     odontogram:[],
     consent:[],


   } as unknown as IUserDocumentPatient;
 }

 protected doctorData(data: IAuthDocumentDoctor, userObjectId: ObjectId): IUserDocumentDoctor {
   const { _id,clinicId,  uId,dni,names, password,job  } = data;
   return {
     _id: userObjectId,
     authId: _id,
     uId,
     dni,
     clinic:clinicId,
     email:'',
     password,
     profileImage:'',
     job,
     phone: '',
     names,
     age:'',
     city:'',
     sex:'',
     joinedAt:null



   } as unknown as IUserDocumentDoctor;
 }
}
