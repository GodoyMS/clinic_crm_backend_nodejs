import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@doctor/auth/interfaces/authDocument.interface';
import { config } from '@configs/configEnvs';
import { ISignUpData } from '@doctor/auth/interfaces/signUpData.interface';

import { IUserDocument } from '@doctor/user/interfaces/userDocument.interface';

export abstract class SignUpUtility {
  protected signToken(data: IAuthDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        uId: data.uId,
        dni:data.dni,
        names:data.names
      },
      config.JWT_TOKEN!
    );
  }

  protected signUpData(data: ISignUpData): IAuthDocument {
    const { _id,clinicId, uId,dni,names, password } = data;
    return {
      _id,
      clinicId,
      uId,
      dni,
      names,
      password,
      createdAt: new Date()
    } as IAuthDocument;
  }




  protected userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
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



    } as unknown as IUserDocument;
  }
}
