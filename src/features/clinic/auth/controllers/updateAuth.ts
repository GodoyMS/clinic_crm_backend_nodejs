import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/clinicAuth.service';
import { userService } from '@services/db/clinicUser.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { AuthPayload } from '../interfaces/authPayload.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { UserCache } from '@services/redis/clinicUser.cache';
import bcrypt from 'bcryptjs';
const userCache: UserCache = new UserCache();

export class UpdateAuth {
   public async update(req: Request, res: Response): Promise<void> {
      const { email, username } = req.body;
      const { userId } = req.currentUser as AuthPayload;
      const existingAuthUser: IAuthDocument | undefined = await authService.getAuthUserById(userId);
      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);

      if (!existingAuthUser || !existingUser) {
         throw new BadRequestError('Invalid credentials');
      }
      existingUser.set({ email, username });
      existingAuthUser.set({ email, username });
      await existingAuthUser.save();
      await existingUser.save();
      await userCache.updateAFieldUserInCache(`${userId}`, 'email', `${email}`);
      await userCache.updateAFieldUserInCache(`${userId}`, 'username', `${username}`);

      const cachedUser: IUserDocument = (await userCache.getUserFromCache(userId)) as IUserDocument;
      const existingUserFromCache: IUserDocument = cachedUser
         ? cachedUser
         : await userService.getUserById(userId);
      
      res.status(HTTP_STATUS.OK).json({ message: 'Clinic auth data succesfully updated', user: existingUserFromCache });
   }

   public async updatePassword(req: Request, res: Response): Promise<void> {
      const { currentPassword, newPassword } = req.body;
      const { userId } = req.currentUser as AuthPayload;
      const existingAuthUser: IAuthDocument | undefined = await authService.getAuthUserById(userId);

      const passwordAccess: Promise<boolean> = bcrypt.compare(currentPassword, existingAuthUser!.password);

      if (await !passwordAccess) {
         throw new BadRequestError('Invalid current password');
      }

      if (!existingAuthUser) {
         throw new BadRequestError('Invalid password');
      }

      const hashedPassword = Generators.hash(newPassword);
      existingAuthUser.set({ password: hashedPassword });
      await existingAuthUser.save();
      res.status(HTTP_STATUS.OK).json({ message: 'Clinic password changed succesfully' });
   }

   public async getAuthData(req: Request, res: Response): Promise<void> {
      const { userId } = req.currentUser as AuthPayload;
      const existingAuthUser: IAuthDocument | undefined = await authService.getAuthUserById(userId);

      if (!existingAuthUser) {
         throw new BadRequestError('Invalid credentials');
      }
      res.status(HTTP_STATUS.OK).json({ message: 'Succes getting authData', authData: existingAuthUser });
   }
}
