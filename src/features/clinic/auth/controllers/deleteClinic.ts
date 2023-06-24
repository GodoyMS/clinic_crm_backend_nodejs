import { Request, Response } from 'express';
import { UserCache } from '@services/redis/clinicUser.cache';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { userService } from '@services/db/clinicUser.service';
import HTTP_STATUS from 'http-status-codes';
import { AuthPayload } from '../interfaces/authPayload.interface';
import { BadRequestError } from '@helpers/errors/badRequestError';
const userCache: UserCache = new UserCache();

export class DeleteUserClinic {
   public async delete(req: Request, res: Response): Promise<void> {
      const { userId } = req.currentUser as AuthPayload;
      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid credentials');
      }
      existingUser.delete();
      await userCache.deleteAUserCache(userId);
      res.status(HTTP_STATUS.OK).json({ message: 'Clinic  data was succesfully deleted' });
   }
}
