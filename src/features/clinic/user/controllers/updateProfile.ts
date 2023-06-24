import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/clinicAuth.service';
import { userService } from '@services/db/clinicUser.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { AuthPayload } from '@clinic/auth/interfaces/authPayload.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { UserCache } from '@services/redis/clinicUser.cache';
import bcrypt from 'bcryptjs';
const userCache: UserCache = new UserCache();

export class UpdateClinicInfo {

   public async update(req: Request, res: Response): Promise<void> {
      const { specialty, phone,location } = req.body;
      const { userId,uId } = req.currentUser as AuthPayload;

      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);

      if (!existingUser) {
         throw new BadRequestError('Invalid credentials');
      }
      existingUser.set({ specialty, phone, location });
      await existingUser.save();
      // await userCache.updateAFieldUserInCache(`${userId}`, 'specialty', `${specialty}`);
      // await userCache.updateAFieldUserInCache(`${userId}`, 'phone', `${phone}`);
      // await userCache.updateAFieldUserInCache(`${userId}`, 'location', `${location}`);
      await userCache.updateAllFieldsInCache(userId,uId,existingUser);


      const cachedUser: IUserDocument = (await userCache.getUserFromCache(userId)) as IUserDocument;
      const existingUserFromCache: IUserDocument = cachedUser
         ? cachedUser
         : await userService.getUserById(userId);

      res.status(HTTP_STATUS.OK).json({ message: 'Clinic auth data succesfully updated', user: existingUserFromCache });
   }

}
