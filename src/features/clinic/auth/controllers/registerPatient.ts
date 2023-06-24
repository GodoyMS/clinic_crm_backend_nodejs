import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { signupSchema } from '@patient/auth/schemes/signup';
import { authService } from '@services/db/patientAuth.service';
import { UserCache } from '@services/redis/patientUser.cache';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import { IAuthDocument as IAuthDocumentPatient } from '@patient/auth/interfaces/authDocument.interface';
import { IAuthDocument } from '../interfaces/authDocument.interface';
import { IUserDocument } from '@patient/user/interfaces/userDocument.interface';
import { omit } from 'lodash';
import { userQueue } from '@services/queues/patientUser.queue';
import { authQueue } from '@services/queues/patientAuth.queue';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/clinicUser.service';
import { SignUpUtility } from './utilities/signup.utility';

const userCache: UserCache = new UserCache();

export class RegisterPatient extends SignUpUtility {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { dni, names,sex} = req.body;
    const checkIfUserExist = await authService.getAuthUserByDni(dni);
    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials for this user');
    }
    const currentClinic=await userService.getUserDocById(`${req.currentUser!.userId}`);

    if (!currentClinic) {
      throw new BadRequestError('Invalid token');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Generators.generateRandomIntegers(12)}`;
    const randomPassword= Generators.generateRandomPassword(10);
    // const passwordHash = await Generators.hash(password); For later
    const authDataPatient: IAuthDocumentPatient = RegisterPatient.prototype.signUpPatient({
      _id: authObjectId,
      clinicId:currentClinic.id,
      uId,
      dni,
      names,
      password: randomPassword,
    });






    //const result: UploadApiResponse = (await uploads(avatarImage, `${userObjectId}`)) as UploadApiResponse;
    //if (!result?.public_id) {
    //  throw new BadRequestError('File upload: Error ocurred. Try again.');
    //}

    const userDataForCache: IUserDocument = RegisterPatient.prototype.patientData(authDataPatient, userObjectId);
    userDataForCache.sex=sex;
    //userDataForCache.profilePicture = `${config.CLOUD_DOMAIN}/${config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;
    await userCache.saveToUserCache(`${userObjectId}`, uId, userDataForCache);

    omit(userDataForCache, ['uId', 'username', 'email', 'password']);
    authQueue.addAuthUserJob('addAuthUserPatientToDB', { value: userDataForCache });
    userQueue.addUserJob('addUserPatientToDB', { value: userDataForCache });



    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'Patient created succesfully', patient: userDataForCache });
  }
}
