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

  public async saveToUserCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
    const createdAt = new Date();
    const {
      _id,
      uId,
      username,
      email,
      patients,
      doctors,
      location,
      specialty


    } = createdUser;

    const dataToSave = {
      _id: `${_id}`,
      uId: `${uId}`,
      username: `${username}`,
      email: `${email}`,
      patients: JSON.stringify(patients),
      doctors: JSON.stringify(doctors),
      location: JSON.stringify(location),
      specialty: `${specialty}`,
      createdAt: `${createdAt}`,


    };

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      await this.client.ZADD('user', { score: parseInt(userUId, 10), value: `${key}` });
      for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
        await this.client.HSET(`users:${key}`, `${itemKey}`, `${itemValue}`);
      }
    } catch (error) {
      log.error(error);
      throw new ServerError('Server Redis error. Try again.');
    }
  }

  public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const response: IUserDocument = (await this.client.HGETALL(`users:${userId}`)) as unknown as IUserDocument;
      response.patients = Generators.parseJson(`${response.patients}`);
      response.doctors = Generators.parseJson(`${response.doctors}`);
      response.appointments = Generators.parseJson(`${response.appointments}`);
      response.phone = Generators.parseJson(`${response.phone}`);
      response.specialty = Generators.parseJson(`${response.specialty}`);


      response.createdAt = new Date(Generators.parseJson(`${response.createdAt}`));
      response.location = Generators.parseJson(`${response.location}`);


      return response;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server Redis error. Try again.');
    }
  }
}
