import { BaseCache } from './base.cache';
import { IUserDocument } from '@patient/user/interfaces/userDocument.interface';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { ServerError } from '@helpers/errors/serverError';
import { Generators } from '@helpers/generators/generators';

const log: Logger = logger.createLogger('userPatientCache');

export class UserCache extends BaseCache {
   constructor() {
      super('patientUserCache');
   }

   public async saveToUserCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
      const createdAt = new Date();
      const { _id, uId, dni, clinicId, email, phone, names, age, city, sex, clinicHistory, odontogram, consent } =
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
         clinicHistory: JSON.stringify(clinicHistory),
         odontogram: JSON.stringify(odontogram),
         consent: JSON.stringify(consent),
         createdAt: `${createdAt}`,
      };

      try {
         if (!this.client.isOpen) {
            await this.client.connect();
         }

         await this.client.ZADD('userPatient', { score: parseInt(userUId, 10), value: `${key}` });
         for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
            await this.client.HSET(`usersPatient:${key}`, `${itemKey}`, `${itemValue}`);
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

        await this.client.DEL(`usersPatient:${key}`);

      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }



   }

   public async updateInfoAndSaveToUserCache (key:string,exisitingUser:IUserDocument):Promise<void>{

      const { _id, uId, dni, clinicId, email, phone, names, age, city, sex, clinicHistory, odontogram, consent } =
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
         clinicHistory: JSON.stringify(clinicHistory),
         odontogram: JSON.stringify(odontogram),
         consent: JSON.stringify(consent),
      };

      try {
         if (!this.client.isOpen) {
            await this.client.connect();         }


         for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
            await this.client.HSET(`usersPatient:${key}`, `${itemKey}`, `${itemValue}`);
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
            `usersPatient:${userId}`,
         )) as unknown as IUserDocument;
         response.createdAt = new Date(Generators.parseJson(`${response.createdAt}`));
         response.clinicId = Generators.parseJson(`${response.clinicId}`);
         response.phone = Generators.parseJson(`${response.phone}`);
         response.names = Generators.parseJson(`${response.names}`);
         response.age = Generators.parseJson(`${response.age}`);
         response.city = Generators.parseJson(`${response.city}`);
         response.sex = Generators.parseJson(`${response.sex}`);
         response.clinicHistory = Generators.parseJson(`${response.clinicHistory}`);
         response.odontogram = Generators.parseJson(`${response.odontogram}`);
         response.consent = Generators.parseJson(`${response.consent}`);

         return response;
      } catch (error) {
         log.error(error);
         throw new ServerError('Server Redis error. Try again.');
      }
   }
}
