import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { signupSchema } from '@patient/auth/schemes/signup';
import { authService } from '@services/db/doctorAuth.service';
import { UserCache } from '@services/redis/doctorUser.cache';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import { IAuthDocument as IAuthDocuementDoctor } from '@doctor/auth/interfaces/authDocument.interface';
import { IUserDocument } from '@doctor/user/interfaces/userDocument.interface';

import { omit } from 'lodash';
import { userQueue } from '@services/queues/doctorUser.queue';
import { authQueue } from '@services/queues/doctorAuth.queue';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/clinicUser.service';
import { SignUpUtility } from './utilities/signup.utility';

import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { uploads } from '@helpers/cloudinary/cloudinaryUploads';
import { config } from '@configs/configEnvs';

const userCache: UserCache = new UserCache();

export class RegisterDoctor extends SignUpUtility {
   //   @joiValidation(signupSchema)
   public async create(req: Request, res: Response): Promise<void> {
      const { dni, names, job, profileImage,sexo } = req.body;
      const checkIfUserExist = await authService.getAuthUserByDni(dni);
      if (checkIfUserExist) {
         throw new BadRequestError('Invalid credentials for this user');
      }
      const currentClinic = await userService.getUserDocById(`${req.currentUser!.userId}`);

      if (!currentClinic) {
         throw new BadRequestError('Invalid token');
      }

      const authObjectId: ObjectId = new ObjectId();
      const userObjectId: ObjectId = new ObjectId();
      const uId = `${Generators.generateRandomIntegers(12)}`;
      const randomPassword = Generators.generateRandomPassword(10);
      // const passwordHash = await Generators.hash(password); For later
      const authDataPatient: IAuthDocuementDoctor = RegisterDoctor.prototype.signUpDoctor({
         _id: authObjectId,
         clinicId: currentClinic.id,
         uId,
         job,
         dni,
         names,
         password: randomPassword,
      }) as IAuthDocuementDoctor;



      const userDataForCache: IUserDocument = RegisterDoctor.prototype.doctorData(authDataPatient, userObjectId);

      if (profileImage && profileImage !== '') {
         const result: UploadApiResponse = (await uploads(profileImage, `${userObjectId}`)) as UploadApiResponse;
         if (!result?.public_id) {
            throw new BadRequestError('File upload: Error ocurred. Try again.');
         }
         userDataForCache.profileImage = `${config.CLOUD_DOMAIN}/${config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;
      }else{
         if(sexo === 'Mujer'){
            userDataForCache.profileImage = 'https://cdn.midjourney.com/cb90dbf1-ee6b-421a-b580-7597604048eb/0_3.png';
         }else{
            userDataForCache.profileImage = 'https://cdn.midjourney.com/e39468a9-7df0-4155-87f7-7c9b9d680731/0_2.png';
         }

      }
      userDataForCache.job=job;
      userDataForCache.sex=sexo;

      await userCache.saveToUserCache(`${userObjectId}`, uId, userDataForCache);

      omit(userDataForCache, ['uId', 'username', 'email', 'password']);
      authQueue.addAuthUserJob('addAuthUserDoctorToDB', { value: userDataForCache });
      userQueue.addUserJob('addUserDoctorToDB', { value: userDataForCache });
      res.status(HTTP_STATUS.CREATED).json({ message: 'Doctor created succesfully', doctor: userDataForCache });
   }
}
