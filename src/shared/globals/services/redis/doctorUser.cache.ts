import { BaseCache } from './base.cache';
import { IUserDocument } from '@doctor/user/interfaces/userDocument.interface';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { ServerError } from '@helpers/errors/serverError';
import { Generators } from '@helpers/generators/generators';

const log: Logger = logger.createLogger('userDoctorCache');

export class UserCache extends BaseCache {
   constructor() {
      super('doctorUserCache');
   }

   public async saveToUserCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
      const createdAt = new Date();
      const { _id, uId, dni, clinicId, email, phone, names, age, city, sex } =
         createdUser;

      const dataToSave = {
         _id: `${_id}`,
         uId: `${uId}`,
         dni: `${dni}`,
         clinicId: `${clinicId}`,
         email: `${email}`,
         phone: `${phone}`,
         names: `${names}`,
         age: `${age}`,
         city: `${city}`,
         sex: `${sex}`,

         createdAt: `${createdAt}`,
      };

      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }

         await this.client.ZADD('userDoctor', { score: parseInt(userUId, 10), value: `${key}` });
         for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
            await this.client.HSET(`usersDoctor:${key}`, `${itemKey}`, `${itemValue}`);
         }
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }
   }
   public async deleteAUserCache(key:string):Promise<void>{

      try {
         if (!this.client.isOpen) {
            await this.client.connect();         }

        await this.client.DEL(`usersDoctor:${key}`);

      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }



   }

   public async updateInfoAndSaveToUserCache (key:string,exisitingUser:IUserDocument):Promise<void>{

      const { _id, uId, dni, clinicId, email, phone, names, age, city, sex } =
      exisitingUser;

      const dataToSave = {
         _id: `${_id}`,
         uId: `${uId}`,
         dni: `${dni}`,
         clinicId: `${clinicId}`,
         email: `${email}`,
         phone: `${phone}`,
         names: `${names}`,
         age: `${age}`,
         city: `${city}`,
         sex: `${sex}`,

      };

      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }


         for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
            await this.client.HSET(`usersDoctor:${key}`, `${itemKey}`, `${itemValue}`);
         }
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }

   };

   public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }

         const response: IUserDocument = (await this.client.HGETALL(
            `usersDoctor:${userId}`,
         )) as unknown as IUserDocument;
         response.createdAt = new Date(Generators.parseJson(`${response.createdAt}`));
         response.clinicId = Generators.parseJson(`${response.clinicId}`);
         response.phone = Generators.parseJson(`${response.phone}`);
         response.names = Generators.parseJson(`${response.names}`);
         response.age = Generators.parseJson(`${response.age}`);
         response.city = Generators.parseJson(`${response.city}`);
         response.sex = Generators.parseJson(`${response.sex}`);


         return response;
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }
   }
}
