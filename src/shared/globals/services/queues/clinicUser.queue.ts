import { BaseQueue } from './base.queue';
import { userWorker } from '@workers/clinicUser.worker';
import { IUserJob } from '@clinic/user/interfaces/userJob.interface';

class UserQueue extends BaseQueue {

  constructor() {
    super('userClinic');
    this.processJob('addUserClinicToDB', 5, userWorker.addUserToDB);
  }

  public addUserJob(name: string, data: IUserJob): void {
    this.addJob(name, data);
  }
}

export const userQueue: UserQueue = new UserQueue();
