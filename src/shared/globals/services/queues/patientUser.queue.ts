import { BaseQueue } from './base.queue';
import { patientUserWorker } from '@workers/patientUser.worker';
import { IUserJob } from '@patient/user/interfaces/userJob.interface';

class UserQueue extends BaseQueue {

  constructor() {
    super('userPatient');
    this.processJob('addUserPatientToDB', 5, patientUserWorker.addUserToDB);
  }

  public addUserJob(name: string, data: IUserJob): void {
    this.addJob(name, data);
  }
}

export const userQueue: UserQueue = new UserQueue();
