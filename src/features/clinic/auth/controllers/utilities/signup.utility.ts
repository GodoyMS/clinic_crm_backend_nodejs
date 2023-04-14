import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { config } from '@configs/configEnvs';
import { ISignUpData } from '@clinic/auth/interfaces/signUpData.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';

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

  protected userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id,  email, uId,username, password,  } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username,
      email,
      password,
      patients: [],
      doctors: [],
      phone: '',
      appointments:[],
      location: {
        district: '',
        province: '',
        region: '',
        address: ''
      },
     
    } as unknown as IUserDocument;
  }
}
