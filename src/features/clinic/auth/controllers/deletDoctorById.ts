import { Request, Response } from 'express';
import { userService } from '@services/db/doctorUser.service';
import { IUserDocument } from '@doctor/user/interfaces/userDocument.interface';
import HTTP_STATUS from 'http-status-codes';
import { UserCache } from '@services/redis/doctorUser.cache';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IAuthDocument } from '@patient/auth/interfaces/authDocument.interface';
import { deleteFile } from '@helpers/cloudinary/deleteCloudinaryFileByURL';
const userCache: UserCache = new UserCache();

export class DeleteUserDoctor {
   public async delete(req: Request, res: Response): Promise<void> {
      const doctorID = req.params.id;
      const existingDoctor: IUserDocument | undefined = await userService.deleteUserDocById(doctorID);
      if (!existingDoctor) {
         throw new BadRequestError('Invalid credentials');
      }
      try {
         await deleteFile(existingDoctor.profileImage);
      } catch (error) {
         throw new BadRequestError('Could not delete file from cloudinary');
      }

      const existingAuthDoctor: IAuthDocument | undefined = await userService.deleteUserAuthById(doctorID);
      if (!existingAuthDoctor) {
         throw new BadRequestError('Invalid credentials');
      }

      await userCache.deleteAUserCache(doctorID);
      res.status(HTTP_STATUS.OK).json({ message: 'Patient  data was succesfully deleted' });
   }
}
