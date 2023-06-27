import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { userService as userServicePatient } from '@services/db/patientUser.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IUserDocument as IUserDocumentPatient } from '@patient/user/interfaces/userDocument.interface';
import { UserCache } from '@services/redis/patientUser.cache';
const userCache: UserCache = new UserCache();

export class UpdatePatientInfo {
   public async update(req: Request, res: Response): Promise<void> {
      const updatedFields = req.body;
      const patientID = req.params.id;

      const existingPatient: IUserDocumentPatient | undefined = await userServicePatient.getUserDocById(patientID);
      if (!existingPatient) {
         throw new BadRequestError('Invalid credentials');
      }

      existingPatient.set(updatedFields);
      await existingPatient.save();

      // existingUser.set({ specialty, phone, location });
      await userCache.updateInfoAndSaveToUserCache(`${existingPatient._id}`, existingPatient);

      // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
      // const existingPatientFromCache: IUserDocumentPatient = cachedUser
      //    ? cachedUser
      //    : await userServicePatient.getUserById(patientID);

      res.status(HTTP_STATUS.OK).json({ message: 'Patient auth data succesfully updated', patient: existingPatient });
   }
}
