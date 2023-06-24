import { BaseCache } from './base.cache';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { ServerError } from '@helpers/errors/serverError';
import { Generators } from '@helpers/generators/generators';

const log: Logger = logger.createLogger('userCache');

export class UserCache extends BaseCache {
   constructor() {
      super('clinicUserCache');
   }
   public async updateAFieldUserInCache(key: string, field: string, value: string): Promise<void> {
      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }
         await this.client.HSET(`usersClinic:${key}`, `${field}`, `${value}`);
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }
   }

   public async deleteAUserCache(key:string):Promise<void>{

      try {
         if (!this.client.isOpen) {
            await this.client.connect();         }

        await this.client.DEL(`usersClinic:${key}`);

      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }



   }

   public async updateAllFieldsInCache(key: string, userUId: string, updatedUser: IUserDocument): Promise<void> {
      const { _id, username, phone, email, location, specialty } = updatedUser;

      const dataToSave = {
         _id: `${_id}`,
         uId: `${userUId}`,
         username: `${username}`,
         phone: `${phone}`,
         email: `${email}`,
         location: JSON.stringify(location),
         specialty: `${specialty}`,
      };

      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }

         for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
            await this.client.HSET(`usersClinic:${key}`, `${itemKey}`, `${itemValue}`);
         }
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }
   }

   public async saveToUserCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
      const createdAt = new Date();
      const { _id, uId, username, phone, email, location, specialty } = createdUser;

      const dataToSave = {
         _id: `${_id}`,
         uId: `${uId}`,
         username: `${username}`,
         phone: `${phone}`,
         email: `${email}`,
         location: JSON.stringify(location),
         specialty: `${specialty}`,
         createdAt: `${createdAt}`,
      };

      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }

         await this.client.ZADD('userClinic', { score: parseInt(userUId, 10), value: `${key}` });

         for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
            await this.client.HSET(`usersClinic:${key}`,`${itemKey}`, `${itemValue}`);
         }
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error saveToUserCache. Try again.');
      }
   }

   public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }

         const response: IUserDocument = (await this.client.HGETALL(
            `usersClinic:${userId}`,
         )) as unknown as IUserDocument;
         response.phone = Generators.parseJson(`${response.phone}`);
         response.specialty = Generators.parseJson(`${response.specialty}`);
         response.createdAt = new Date(Generators.parseJson(`${response.createdAt}`));
         response.location = Generators.parseJson(`${response.location}`);
         response.email = Generators.parseJson(`${response.email}`);

         return response;
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error getUserFromCache. Try again.');
      }
   }
}
