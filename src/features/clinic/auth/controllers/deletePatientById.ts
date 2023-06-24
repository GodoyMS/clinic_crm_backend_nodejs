import { Request, Response } from 'express';
import { userService } from '@services/db/patientUser.service';
import { IUserDocument } from '@patient/user/interfaces/userDocument.interface';
import HTTP_STATUS from 'http-status-codes';
import { UserCache } from '@services/redis/patientUser.cache';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IAuthDocument } from '@patient/auth/interfaces/authDocument.interface';
const userCache: UserCache = new UserCache();

export class DeleteUserPatient {
   public async delete(req: Request, res: Response): Promise<void> {
      const patientID = req.params.id;
      const existingPatient: IUserDocument | undefined = await userService.deleteUserDocById(patientID);
      if (!existingPatient) {
         throw new BadRequestError('Invalid credentials');
      }

      const existingPatientAuth: IAuthDocument | undefined = await userService.deleteUserAuthById(patientID);
      if (!existingPatientAuth) {
         throw new BadRequestError('Invalid credentials');
      }

      await userCache.deleteAUserCache(patientID);
      res.status(HTTP_STATUS.OK).json({ message: 'Patient  data was succesfully deleted' });
   }
}
